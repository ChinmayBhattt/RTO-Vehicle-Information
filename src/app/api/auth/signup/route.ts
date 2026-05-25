import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import { validateEmail, checkPasswordStrength, validateName } from "@/lib/utils/validators";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password } = body;

    // Validate inputs
    const nameVal = validateName(name);
    if (!nameVal.valid) {
      return NextResponse.json({ success: false, error: nameVal.error }, { status: 400 });
    }

    const emailVal = validateEmail(email);
    if (!emailVal.valid) {
      return NextResponse.json({ success: false, error: emailVal.error }, { status: 400 });
    }

    const passwordVal = checkPasswordStrength(password);
    if (!passwordVal.valid) {
      return NextResponse.json({ success: false, error: passwordVal.feedback.join(", ") }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: emailVal.formatted });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "A user with this email already exists." },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = new User({
      name: nameVal.formatted,
      email: emailVal.formatted,
      password: hashedPassword,
      role: "user",
      plan: "free",
      searchCount: 0,
    });

    await newUser.save();

    return NextResponse.json(
      { success: true, message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Signup API Error]", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred during signup." },
      { status: 500 }
    );
  }
}
