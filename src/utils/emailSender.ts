import { google } from "googleapis";
import nodemailer from "nodemailer";
// import SMTPTransport from "nodemailer/lib/smtp-transport";

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.MAILING_SERVICE_CLIENT_ID,
    process.env.MAILING_SERVICE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err || !token) {
        reject("Failed to create access token");
      }
      resolve(token || "");
    });
  });
  // const transportOptions: SMTPTransport.Options = {
  //   host: 'smtp.gmail.com',
  //   port: 465,
  //   secure: true,
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.EMAIL,
  //     accessToken,
  //     clientId: process.env.CLIENT_ID,
  //     clientSecret: process.env.CLIENT_SECRET,
  //     refreshToken: process.env.REFRESH_TOKEN,
  //   },
  // };
  // const transporter = nodemailer.createTransport(transportOptions);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const transporter = await createTransporter();
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification",
      html: `
        <h1>Verify Your Email</h1>
        <p>Click the link below to verify your email address:</p>
        <a href="${verificationLink}">Verify Email</a>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};






