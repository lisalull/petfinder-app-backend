import { ObjectId } from "bson";
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
    const client = await getClient();
    const results = await client
      .db()
      .collection<Event>("events")
      .find({ returned: false })
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

eventsRouter.put("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Event>("events")
      .updateOne({ _id: new ObjectId(id) }, { $set: { returned: true } });
    if (result.modifiedCount) {
      res.sendStatus(201);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

eventsRouter.put("/link-sighting/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const newEvent: Event = req.body;
    delete newEvent._id;
    const client = await getClient();
    const result = await client
      .db()
      .collection<Event>("events")
      .replaceOne({ _id: new ObjectId(id) }, newEvent);
    if (result.modifiedCount) {
      res.status(201).json(newEvent);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    errorResponse(error, res);
  }
});

export default eventsRouter;
