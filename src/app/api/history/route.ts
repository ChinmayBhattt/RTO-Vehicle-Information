import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/mongoose";
import SearchHistory from "@/lib/models/SearchHistory";
import User from "@/lib/models/User";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    // Get pagination params
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const total = await SearchHistory.countDocuments({ userId: dbUser._id });
    const items = await SearchHistory.find({ userId: dbUser._id })
      .sort({ searchedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: {
        items,
        total,
        page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("[History GET Error]", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const body = await request.json();
    const { registrationNumber, vehicleData } = body;

    if (!registrationNumber || !vehicleData) {
      return NextResponse.json(
        { success: false, error: "Registration number and vehicle data are required" },
        { status: 400 }
      );
    }

    // Add to history
    const historyItem = new SearchHistory({
      userId: dbUser._id,
      registrationNumber: registrationNumber.toUpperCase(),
      vehicleData,
      searchedAt: new Date(),
    });

    await historyItem.save();

    // Increment user search count
    dbUser.searchCount = (dbUser.searchCount || 0) + 1;
    await dbUser.save();

    return NextResponse.json({ success: true, data: historyItem }, { status: 201 });
  } catch (error) {
    console.error("[History POST Error]", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id");

    if (itemId) {
      // Delete specific item
      const deleted = await SearchHistory.findOneAndDelete({ _id: itemId, userId: dbUser._id });
      if (!deleted) {
        return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, message: "History item deleted" });
    } else {
      // Delete all history for this user
      await SearchHistory.deleteMany({ userId: dbUser._id });
      return NextResponse.json({ success: true, message: "Search history cleared" });
    }
  } catch (error) {
    console.error("[History DELETE Error]", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
