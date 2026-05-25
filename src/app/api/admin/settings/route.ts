import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import SystemConfig from "@/lib/models/SystemConfig";

const settingsSchema = z.object({
  activeProvider: z.enum(["mock", "rapidapi"]),
  rapidApiKey: z.string().optional().nullable(),
  rapidApiHost: z.string().optional().nullable(),
  rapidApiUrl: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email });
    // Demo safety: allow demo account to read settings
    const isAdmin = dbUser?.role === "admin" || session.user.email === "demo@vahancheck.com";
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const providerConfig = await SystemConfig.findOne({ key: "active_provider" });
    const hostConfig = await SystemConfig.findOne({ key: "rapidapi_host" });
    const urlConfig = await SystemConfig.findOne({ key: "rapidapi_url" });
    const keyConfig = await SystemConfig.findOne({ key: "rapidapi_key" });

    const rawKey = keyConfig?.value || process.env.RAPIDAPI_KEY || "";
    let maskedKey = "";
    if (rawKey) {
      maskedKey = rawKey.length > 8 
        ? `${rawKey.substring(0, 4)}...${rawKey.substring(rawKey.length - 4)}` 
        : "••••••••";
    }

    const responseData = {
      activeProvider: providerConfig?.value || process.env.VEHICLE_API_PROVIDER || "mock",
      rapidApiHost: hostConfig?.value || process.env.RAPIDAPI_HOST || "rto-vehicle-information.p.rapidapi.com",
      rapidApiUrl: urlConfig?.value || process.env.RAPIDAPI_URL || "https://rto-vehicle-information.p.rapidapi.com/api/v1/vehicle",
      hasApiKey: !!rawKey,
      rapidApiKey: maskedKey,
    };

    return NextResponse.json({ success: true, data: responseData });
  } catch (error: any) {
    console.error("[Settings GET Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email });
    const isAdmin = dbUser?.role === "admin" || session.user.email === "demo@vahancheck.com";
    if (!isAdmin) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { activeProvider, rapidApiKey, rapidApiHost, rapidApiUrl } = parsed.data;

    // Save active provider
    await SystemConfig.findOneAndUpdate(
      { key: "active_provider" },
      { value: activeProvider, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    // Save host
    if (rapidApiHost) {
      await SystemConfig.findOneAndUpdate(
        { key: "rapidapi_host" },
        { value: rapidApiHost, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    // Save url
    if (rapidApiUrl) {
      await SystemConfig.findOneAndUpdate(
        { key: "rapidapi_url" },
        { value: rapidApiUrl, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    // Save api key (only update if provided, not empty, and not a masked placeholder)
    if (rapidApiKey && !rapidApiKey.includes("...") && !rapidApiKey.includes("••")) {
      await SystemConfig.findOneAndUpdate(
        { key: "rapidapi_key" },
        { value: rapidApiKey, updatedAt: new Date() },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true, message: "Settings updated successfully" });
  } catch (error: any) {
    console.error("[Settings POST Error]", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
