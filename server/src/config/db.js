import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { ENV } from './env.js';
const db = drizzle({ 
  connection: { 
    url: ENV.TURSO_DATABASE_URL, 
    authToken: ENV.TURSO_AUTH_TOKEN
  }
});

export default db;