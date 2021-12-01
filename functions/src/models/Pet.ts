import { ObjectId } from "mongodb";

export default interface Pet {
  _id?: ObjectId;
  name?: string;
  description: string;
  type: string;
  date: string;
}
