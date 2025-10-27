import express from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { inngest, functions } from "./config/ingest.js";
import { serve } from "inngest/express";

const app = express();
app.use(cors());
app.use(express.json());
// Clerk middleware requires a server API key / secret. If not provided we skip
// the middleware to allow local development without failing startup.
if (ENV.CLERK_SECRET_KEY) {
  app.use(clerkMiddleware({ apiKey: ENV.CLERK_SECRET_KEY }));
} else {
  console.warn('CLERK_SECRET_KEY not set; skipping clerk middleware');
}



app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const startServer = async () => {
  try {
    if (ENV.NODE_ENV !== 'production') {
      app.listen(ENV.PORT, () => console.log(`Server is running on port ${ENV.PORT}`));
    }
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

export default app;