import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

// You can specify any property from the libsql connection options
const db = drizzle({ 
  connection: { 
    url: ENV.TURSO_DATABASE_URL, 
    authToken: ENV.TURSO_AUTH_TOKEN
  }
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));