import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/db/mongoose";
import SavedVehicle from "@/lib/models/SavedVehicle";
import User from "@/lib/models/User";

export async function GET() {
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

    const items = await SavedVehicle.find({ userId: dbUser._id }).sort({ savedAt: -1 }).lean();

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error("[Saved Vehicles GET Error]", error);
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
    const { registrationNumber, nickname, vehicleData } = body;

    if (!registrationNumber || !vehicleData) {
      return NextResponse.json(
        { success: false, error: "Registration number and vehicle data are required" },
        { status: 400 }
      );
    }

    const cleanReg = registrationNumber.toUpperCase().replace(/[\s\-]/g, "");

    // Check if already saved
    const existing = await SavedVehicle.findOne({ userId: dbUser._id, registrationNumber: cleanReg });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "This vehicle is already saved in your dashboard." },
        { status: 400 }
      );
    }

    const savedItem = new SavedVehicle({
      userId: dbUser._id,
      registrationNumber: cleanReg,
      nickname: nickname || `${vehicleData.vehicle?.manufacturer} ${vehicleData.vehicle?.model}`,
      vehicleData,
      savedAt: new Date(),
    });

    await savedItem.save();

    return NextResponse.json({ success: true, data: savedItem }, { status: 201 });
  } catch (error) {
    console.error("[Saved Vehicles POST Error]", error);
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
    const id = searchParams.get("id");
    const reg = searchParams.get("reg");

    if (id) {
      const deleted = await SavedVehicle.findOneAndDelete({ _id: id, userId: dbUser._id });
      if (!deleted) {
        return NextResponse.json({ success: false, error: "Saved vehicle not found" }, { status: 404 });
      }
    } else if (reg) {
      const cleanReg = reg.toUpperCase().replace(/[\s\-]/g, "");
      const deleted = await SavedVehicle.findOneAndDelete({ registrationNumber: cleanReg, userId: dbUser._id });
      if (!deleted) {
        return NextResponse.json({ success: false, error: "Saved vehicle not found" }, { status: 404 });
      }
    } else {
      return NextResponse.json({ success: false, error: "ID or Registration number is required" }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Vehicle removed from saved list" });
  } catch (error) {
    console.error("[Saved Vehicles DELETE Error]", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
