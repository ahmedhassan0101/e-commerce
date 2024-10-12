import { NextResponse } from "next/server";
import * as Yup from "yup";
import db from "@/utils/db";
import { generateVerificationToken, validateBody } from "@/utils/functions";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/emailSender";

const signupSchema = Yup.object({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(8).required(),
});

export async function POST(request: Request) {
  try {
    await db.connectDb();
    const body = await request.json();
    const { username, email, password } = validateBody(body, signupSchema);
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    // Generate JWT token with user ID

    const verificationToken = generateVerificationToken(newUser._id.toString());
    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    // Remove sensitive information from the response
    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.emailVerificationToken;
    return NextResponse.json(
      {
        message:
          "User registered successfully. Please check your email to verify your account.",
        data: { user: userResponse },
        status: 201,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      error.errors || {
        message:
          error.message ||
          "An unexpected error occurred [from srcappapiauthsignup\route.ts]",
      },
      { status: error.status || 500 }
    );
  }
}
