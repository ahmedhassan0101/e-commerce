// app/models/User.ts
import mongoose, { Document, Schema } from "mongoose";
interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  image?: string;
  emailVerified: boolean;
  defaultPaymentMethod?: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    image: { type: String, default: "https://avatar.iran.liara.run/public" },
    emailVerified: { type: Boolean, default: false },
    defaultPaymentMethod: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
      active: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
