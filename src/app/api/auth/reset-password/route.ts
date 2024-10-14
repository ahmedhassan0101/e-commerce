import { NextResponse } from "next/server";
import * as Yup from "yup";
import db from "@/utils/db";
import { validateBody } from "@/utils/functions";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/utils/auth";

const resetPasswordSchema = Yup.object({
  token: Yup.string().required(),
  password: Yup.string().min(8).required(),
});

export async function POST(request: Request) {
  try {
    await db.connectDb();
    const body = await request.json();
    const { token, password } = validateBody(body, resetPasswordSchema);

    // Verify the token

    let decoded;
    try {
      decoded = verifyToken(token);
      if (decoded.type !== "passwordReset") {
        throw new Error("Invalid token type");
      }
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      {
        message: "Password has been reset successfully",
        data: { email: user.email },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
