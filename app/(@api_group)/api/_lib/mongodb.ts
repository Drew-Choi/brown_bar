import mongoose, { Connection } from 'mongoose';

const { MONGO_URI } = process.env;

interface CustomNodeJSGlobal extends NodeJS.Global {
  mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

const customGlobal: CustomNodeJSGlobal = global as unknown as CustomNodeJSGlobal;

if (!MONGO_URI) {
  throw new Error('no MONGO_URI');
}

let cached = customGlobal.mongoose;

if (!cached) {
  cached = customGlobal.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then(() => mongoose.connection);

    cached.conn = await cached.promise;
    return cached.conn;
  }
};

export default connectDB;
