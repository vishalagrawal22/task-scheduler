import {
  connect as mongooseConnect,
  set as mongooseSet,
  Model,
  model,
  Schema,
} from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// @ts-ignore
let cached = globalThis.mongooseCache;

if (!cached) {
  // @ts-ignore
  cached = globalThis.mongooseCache = { conn: null, promise: null };
}

export async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongooseConnect(process.env.MONGODB_URI || "").then(
      (mongoose) => {
        return mongoose;
      }
    );
    mongooseSet("strictQuery", false);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default function createModel<T, TModel = Model<T>>(
  modelName: string,
  schema: Schema<T>
): TModel {
  let createdModel: TModel;
  if (process.env.NODE_ENV === "development") {
    // @ts-ignore
    if (!global[modelName]) {
      createdModel = model<T, TModel>(modelName, schema);
      // @ts-ignore
      global[modelName] = createdModel;
    }
    // @ts-ignore
    createdModel = global[modelName];
  } else {
    createdModel = model<T, TModel>(modelName, schema);
  }
  return createdModel;
}
