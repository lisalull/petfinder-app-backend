import { ObjectId } from "mongodb";

export default interface Event {
  _id?: ObjectId;
  name?: string;
  description: string;
  category: string;
  date: string;
  time?: string;
  lat: number;
  lng: number;
  media?: string;
  uid: string;
  returned: boolean;
}
