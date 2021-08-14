import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URL;

const client = new MongoClient(uri);

const testConnection = async (dbName) => {
  try {
    await client.connect();
    await client.db(dbName).command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    await client.close();
  }
};

const insertUser = async (name, email, password) => {
  try {
    await client.connect();
    const usersCollection = client.db("development").collection("users");
    await usersCollection.insertOne({ name, email, password });
    const documents = await usersCollection
      .find()
      .sort({ _id: -1 })
      .limit(1)
      .toArray();
    console.log(documents);
    return documents;
  } catch (error) {
    console.log("Error Inserting Document:", error);
  } finally {
    await client.close();
  }
};

export { client, testConnection, insertUser };
