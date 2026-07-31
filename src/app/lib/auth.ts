import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/crowdfunding-platform";
const client = new MongoClient(mongoUri);
const db = client.db("crowdfunding-platform");

export function getDb() {
  return db;
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "supporter",
      },
      credits: {
        type: "number",
        required: true,
        defaultValue: 0,
      },
      profilePictureUrl: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
});