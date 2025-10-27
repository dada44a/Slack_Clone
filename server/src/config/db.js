import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { ENV } from './env.js';

// Create a libsql client then pass it to drizzle. The previous code
// passed a plain object which is not the client instance drizzle expects.
const client = createClient({
  url: ENV.TURSO_DATABASE_URL,
  authToken: ENV.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

export default db;