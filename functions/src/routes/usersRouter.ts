import express from "express";
import { getClient } from "../db";
import User from "../models/User";

const usersRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

usersRouter.get("/:id", async (req, res) => {
  try {
    const id: string = req.params.id;
    const client = await getClient();
    const results = await client
      .db()
      .collection<User>("users")
      .find({ uid: id })
      .toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const newUser: User = req.body;
    const client = await getClient();
    await client.db().collection<User>("users").insertOne(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default usersRouter;
