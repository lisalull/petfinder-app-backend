import { ObjectId } from "bson";

export default interface Profile {
  _id?: ObjectId;
  displayname: string;
  phone: string;
  email: string;
  preferredContact: string;
  uid: string;
}
