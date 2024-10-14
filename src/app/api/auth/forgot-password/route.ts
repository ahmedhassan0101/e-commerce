
import { NextResponse } from "next/server";
import * as Yup from "yup";
import db from "@/utils/db";
import { validateBody } from "@/utils/functions";
import User from "@/app/models/User";
import { generatePasswordResetToken } from "@/utils/auth";
import { sendPasswordResetEmail } from "@/utils/emailSender";

const forgotPasswordSchema = Yup.object({
  email: Yup.string().email().required(),
});

export async function POST(request: Request) {
  try {
    await db.connectDb();
    const body = await request.json();
    const { email } = validateBody(body, forgotPasswordSchema);

    const user = await User.findOne({ email });

    // Always return a success message, even if the user doesn't exist
    // This prevents email enumeration attacks
    if (user) {
      const resetToken = generatePasswordResetToken(user._id.toString());
      await sendPasswordResetEmail(email, resetToken);
    }

    return NextResponse.json(
      {
        message: "If an account with that email exists, we have sent a password reset link.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}