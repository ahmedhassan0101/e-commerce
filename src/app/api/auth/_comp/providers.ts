import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GITHUB_ID,
  GITHUB_SECRET,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_ISSUER_BASE_URL,
} = process.env;

export const providers = [
  Auth0Provider({
    clientId: AUTH0_CLIENT_ID!,
    clientSecret: AUTH0_CLIENT_SECRET!,
    issuer: AUTH0_ISSUER_BASE_URL!,
  }),
  GoogleProvider({
    clientId: GOOGLE_CLIENT_ID!,
    clientSecret: GOOGLE_CLIENT_SECRET!,
  }),
  GitHubProvider({
    clientId: GITHUB_ID!,
    clientSecret: GITHUB_SECRET!,
  }),
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Invalid credentials");
      }
      await db.connectDb();
      const user = await User.findOne({ email: credentials.email });
      if (!user || !user.password) {
        throw new Error("Invalid credentials");
      }
      const isCorrectPassword = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Invalid credentials");
      }
      return {
        id: user._id,
        email: user.email,
        name: user.username,
        // role: user.role || "user",
      };
    },
  }),
];

// import CredentialsProvider from "next-auth/providers/credentials";

// // Provider configurations
// export const providers = [

//   CredentialsProvider({
//     name: "Credentials",
//     credentials: {
//       email: {
//         label: "Email",
//         type: "email",
//         placeholder: "example@dookan.com",
//       },
//       password: {
//         label: "Password",
//         type: "password",
//         placeholder: "$2a$10$nC1ZY81JWD9k",
//       },
//     },
//     async authorize(credentials) {
//       if (!credentials) {
//         return null;
//       }

//       const { email, password } = credentials as {
//         email: string;
//         password: string;
//       };

//       // Test with Static Credentials: Temporarily hardcode credentials
//       // in your authorize function to verify that the authentication flow works:
//       // if (email === "admin@dookan.com" && password === "123123") {
//       //   return { id: 1, name: "Admin", email: "admin@dookan.com" };
//       // }
//       // return null;

//       try {
//         // Connect to the database
//         await db.connectDb();

//         // Find the user by email
//         const user = await User.findOne({ email });

//         if (!user) {
//           // If no user is found, return null
//           return null;
//         }

//         // // Check if the password matches
//         const isMatch = await user.comparePassword(password);

//         if (!isMatch) {
//           // If password is incorrect, return null
//           return null;
//         }

//         // If successful, return the user object with necessary details
//         return {
//           id: user._id.toString(),
//           name: user.username,
//           email: user.email,
//           role: user.role,
//           image: user.image,
//         };
//       } catch (error) {
//         console.error("Error during authorization", error);
//         return null;
//       }
//     },
//   }),
// ];
