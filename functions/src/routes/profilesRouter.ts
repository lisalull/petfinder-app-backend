import express from "express";
import { getClient } from "../db";
import Profile from "../models/Profile";

const profilesRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

profilesRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<Profile>("profiles")
      .find({ uid: id })
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

profilesRouter.post("/", async (req, res) => {
  try {
    const newUser: Profile = req.body;
    const client = await getClient();
    await client.db().collection<Profile>("profiles").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default profilesRouter;
