
// import mongoose from 'mongoose';

// if (!process.env.MONGODB_URL) {
//   throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
// }

// let cached = global.mongoose;
// // Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }
// // Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.ts(7017)
// // any
// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(process.env.MONGODB_URL!, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//   } catch (e) {
//     cached.promise = null;
//     throw e;
//   }

//   return cached.conn;
// }

// export default dbConnect;