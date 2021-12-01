import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import petRouter from "./routes/petRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/pets", petRouter);
export const api = functions.https.onRequest(app);
