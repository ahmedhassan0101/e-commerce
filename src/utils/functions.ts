export const imageLoader = (path: string): string => `/${path}`;
import * as Yup from "yup";
// import crypto from "crypto";
import jwt from "jsonwebtoken";

export function generateVerificationToken(userId: string): string {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" } // Token expires in 24 hours
  );
}
// export function generateVerificationToken(): string {
//   return crypto.randomBytes(32).toString("hex");
// }

export function validateBody<T>(body: unknown, schema: Yup.Schema<T>): T {
  try {
    return schema.validateSync(body, { abortEarly: false });
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      const errors = error.inner.reduce(
        (acc, err) => ({
          ...acc,
          [err.path!]: err.message,
        }),
        {}
      );
      throw { status: 400, errors };
    }
    throw error;
  }
}
// function validateBody<T>(body: unknown, schema: ZodSchema<T>): T {
//   try {
//     return schema.parse(body); // Zod validation is synchronous
//   } catch (error) {
//     if (error instanceof ZodSchema.ValidationError) {
//       const errors = error.errors.reduce((acc: any, err) => ({
//         ...acc,
//         [err.path.join('.')]: err.message,
//       }), {});
//       throw { status: 400, errors };
//     }
//     throw error;
//   }
// }

// generate a random base64 string using Node.js:
// console.log(require('crypto').randomBytes(32).toString('base64'));
// console.log(require("crypto").randomBytes(64).toString("hex"));
// function generateJWTSecret() {
//   return crypto.randomBytes(64).toString('hex');
// }
