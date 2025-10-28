import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;

if (!url) throw new Error("TURSO_DATABASE_URL is not defined");

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url,        // guaranteed to be string
    authToken: token || "", // default to empty string if undefined
  },
});
