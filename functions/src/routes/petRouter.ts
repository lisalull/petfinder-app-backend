import express from "express";
import { getClient } from "../db";
import Pet from "../models/Pet";

const petRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error("FAIL", error);
  res.status(500).json({ message: "Internal Server Error" });
};

petRouter.get("/", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client.db().collection<Pet>("pets").find().toArray();
    res.json(results);
  } catch (err) {
    errorResponse(err, res);
  }
});

export default petRouter;
