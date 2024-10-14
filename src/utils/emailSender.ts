import { google } from "googleapis";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";
// Cannot find module 'handlebars' or its corresponding type declarations.ts(2307)
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
      clientId: process.env.MAILING_SERVICE_CLIENT_ID,
      clientSecret: process.env.MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: process.env.MAILING_SERVICE_REFRESH_TOKEN,
    },
  });

  return transporter;
};
interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

export const sendEmail = async ({ to, subject, template, context }: EmailOptions) => {
  try {
    const transporter = await createTransporter();

    const templatePath = path.join(process.cwd(), 'email-templates', `${template}.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(templateContent);
    const html = compiledTemplate(context);

    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};


export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Email Verification",
    template: "verification-email",
    context: { verificationLink },
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  await sendEmail({
    to: email,
    subject: "Password Reset",
    template: "password-reset-email",
    context: { resetLink },
  });
};
// export const sendVerificationEmail = async (email: string, token: string) => {
//   try {
//     const transporter = await createTransporter();
//     const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: email,
//       subject: "Email Verification",
//       html: `
//         <h1>Verify Your Email</h1>
//         <p>Click the link below to verify your email address:</p>
//         <a href="${verificationLink}">Verify Email</a>
//       `,
//     };

//     const result = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", result);
//     return result;
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// };






