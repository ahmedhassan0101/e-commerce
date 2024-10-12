import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import db from "@/utils/db";
import User from "@/app/models/User";

export async function GET(request: Request) {
  try {
    await db.connectDb();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    try {
      // Verify and decode the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };

      const user = await User.findById(decoded.userId);

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 400 }
        );
      }

      if (user.emailVerified) {
        return NextResponse.json(
          { message: "Email already verified" },
          { status: 400 }
        );
      }

      user.emailVerified = true;
      await user.save();

      return NextResponse.json(
        { message: "Email verified successfully" },
        { status: 200 }
      );
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return NextResponse.json(
          { message: "Verification token has expired" },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred, [from emailVerificationEndpoint]" },
      { status: 500 }
    );
  }
}
