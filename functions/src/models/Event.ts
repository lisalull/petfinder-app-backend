import { ObjectId } from "mongodb";

interface Sighting {
  lat: number;
  lng: number;
  date: string;
  time?: string;
  description: string;
}

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
  sightings?: Sighting[];
}
