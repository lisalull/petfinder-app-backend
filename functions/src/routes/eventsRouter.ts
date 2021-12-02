import express from "express";
import { getClient } from "../db";
import Event from "../models/Event";

const eventsRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

eventsRouter.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const query: any = { ...(category ? { category } : {}) };
    const client = await getClient();
    const results = await client
      .db()
      .collection<Event>("events")
      .find(query)
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

eventsRouter.post("/", async (req, res) => {
  try {
    const newEvent: Event = req.body;
    const client = await getClient();
    await client.db().collection<Event>("events").insertOne(newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default eventsRouter;
