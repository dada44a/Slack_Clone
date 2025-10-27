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
app.use(clerkMiddleware({ apiKey: ENV.CLERK_API_KEY }));



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