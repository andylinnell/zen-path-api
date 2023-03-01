import { MongoClient } from "mongodb";
import { mongo_credientials } from "./secrets.js";

export async function dbConnect() {
    const client = new MongoClient(mongo_credientials.URI);
    return client.db(mongo_credientials.db)
}