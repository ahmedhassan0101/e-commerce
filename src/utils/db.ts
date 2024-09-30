import mongoose, { ConnectOptions } from "mongoose";

interface ConnectionState {
  isConnected?: number | boolean;
}

const connection: ConnectionState = {};

export async function connectDb(): Promise<void> {
  try {
    if (connection.isConnected) {
      console.log("Already connected to the database.");
      return;
    }

    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;
      if (connection.isConnected === 1) {
        console.log("Using existing database connection.");
        return;
      }
      await mongoose.disconnect();
    }

    const db = await mongoose.connect(
      process.env.MONGODB_URL as string,
      {
        // You can add additional options here if needed, but 'useNewUrlParser' and 'useUnifiedTopology' are now defaults.
      } as ConnectOptions
    );

    console.log("New connection established to the database.");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Optionally, handle graceful shutdown instead of force exit
  }
}

export async function disconnectDb(): Promise<void> {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
      console.log("Disconnected from the database in production mode.");
    } else {
      console.log("Not disconnecting from the database in development mode.");
    }
  } else {
    console.log("No active database connection to disconnect.");
  }
}

const db = { disconnectDb, connectDb };

export default db;
