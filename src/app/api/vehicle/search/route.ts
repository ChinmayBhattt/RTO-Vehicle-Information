import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchVehicle } from "@/lib/services/vehicleService";
import { validateRegistrationNumber } from "@/lib/utils/validators";
import { checkRateLimit } from "@/lib/security/rateLimiter";
import { RATE_LIMIT } from "@/lib/constants/config";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/mongoose";
import SearchHistory from "@/lib/models/SearchHistory";
import User from "@/lib/models/User";

const searchSchema = z.object({
  registrationNumber: z.string().min(1, "Registration number is required"),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
    const rateLimitResult = checkRateLimit(
      `search:${ip}`,
      RATE_LIMIT.SEARCH_PER_MINUTE,
      RATE_LIMIT.WINDOW_MS
    );

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
          retryAfter: Math.ceil(rateLimitResult.resetIn / 1000),
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimitResult.resetIn / 1000)),
            "X-RateLimit-Remaining": String(rateLimitResult.remaining),
          },
        }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const parsed = searchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // Validate registration number format
    const validation = validateRegistrationNumber(parsed.data.registrationNumber);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Search for vehicle
    const vehicleData = await searchVehicle(validation.formatted);

    // Auto-save search to history if user is authenticated
    try {
      const session = await auth();
      if (session && session.user && session.user.email) {
        await dbConnect();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          // Add to search history
          const historyItem = new SearchHistory({
            userId: dbUser._id,
            registrationNumber: validation.formatted,
            vehicleData,
            searchedAt: new Date(),
          });
          await historyItem.save();

          // Increment count
          dbUser.searchCount = (dbUser.searchCount || 0) + 1;
          await dbUser.save();
        }
      }
    } catch (saveError) {
      // Don't fail the lookup if saving history fails
      console.error("[Search History Auto-Save Error]", saveError);
    }

    return NextResponse.json(
      { success: true, data: vehicleData },
      {
        status: 200,
        headers: {
          "X-RateLimit-Remaining": String(rateLimitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error("[Vehicle Search Error]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
