import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import profilesRouter from "./routes/profilesRouter";
import eventsRouter from "./routes/eventsRouter";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/profiles", profilesRouter);
app.use("/events", eventsRouter);
export const api = functions.https.onRequest(app);
