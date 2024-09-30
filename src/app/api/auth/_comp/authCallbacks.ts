// import User from "@/models/User";
// import { NextAuthOptions } from "next-auth";

// export const authCallbacks: NextAuthOptions["callbacks"] = {
//   async session({ session, token }) {
//     // Your session callback logic
//     const user = await User.findById(token.sub);

//     session.user.id = token.sub || user._id.toString();
//     session.user.role = user.role || "user";
//     return session;
//   },

//   async jwt({ token }) {
//     // Your JWT callback logic
//     return token;
//   },
//   async redirect({ url, baseUrl }) {
//     return url.startsWith(baseUrl) ? url : baseUrl;
//   },
// };
