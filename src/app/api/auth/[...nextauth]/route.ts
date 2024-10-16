import NextAuth, { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";
import { providers } from "../_comp/providers";
import clientPromise from "@/utils/mongoDb";

const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "e-commerce",
  }) as Adapter,
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: providers,
  debug: true,
  // debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// Custom function to find a user by email
// async function findUserByEmail(email: string) {
//   const client = await clientPromise;
//   const db = client.db("e-commerce");
//   return db.collection("users").findOne({ email });
// }

// // Custom function to link accounts
// async function linkAccount(userId: string, account: any) {
//   const client = await clientPromise;
//   const db = client.db("e-commerce");
//   await db.collection("accounts").insertOne({
//     userId,
//     provider: account.provider,
//     providerAccountId: account.providerAccountId,
//     // Add any other necessary fields
//   });
// }

// const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise, {
//     databaseName: "e-commerce",
//   }) as Adapter,
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: providers,
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account?.provider === "google") {
//         const existingUser = await findUserByEmail(user.email!);
//         if (existingUser) {
//           // Link the Google account to the existing user
//           await linkAccount(existingUser._id.toString(), account);
//           return true;
//         }
//       }
//       return true;
//     },
//   },
//   debug: true,
// };

// callbacks: authCallbacks,
// pages: { signIn: "/auth/login" },
// declare module "next-auth" {
//   interface Session {
//     user: {
//       patreon?: string;
//       name?: string | null;
//       email?: string | null;
//     };
//   }

//   interface User {
//     patreon?: string;
//   }

//   interface JWT {
//     patreon?: string;
//   }
// }

// callbacks: {
//   async signIn({ user, account, profile, email, credentials }) {
//     try {
//       // Your sign-in logic here
//       return true;
//     } catch (error) {
//       console.error("Sign-in error:", error);
//       return false;
//     }
//   },
//   async session({ session, user }) {
//     if (session.user) {
//       session.user.patreon = user.patreon || "http://patreon.com/user";
//     }
//     return session;
//   },
// },
