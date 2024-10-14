import jwt from "jsonwebtoken";

export function generateVerificationToken(userId: string): string {
  return jwt.sign(
    { userId, type: 'verification' },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" } // Token expires in 24 hours
  );
}

export function generatePasswordResetToken(userId: string): string {
  return jwt.sign(
    { userId, type: 'passwordReset' },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
}

export function verifyToken(token: string): { userId: string; type: string } {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; type: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}