import { MongoClient, ObjectId } from "mongodb";
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
    const exisitngUser = await usersCollection.findOne({ email });
    if (!exisitngUser) {
      await usersCollection.insertOne({ name, email, password });
      const documents = await usersCollection
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();
      return documents;
    }
    throw new Error("EXISTING_USER");
  } finally {
    await client.close();
  }
};

const findUserByEmail = async (email) => {
  try {
    await client.connect();
    const usersCollection = client.db("development").collection("users");
    const user = await usersCollection.findOne({ email });
    if (user) {
      return user;
    }
    throw new Error("NO_USER_FOUND");
  } finally {
    await client.close();
  }
};

const findUserById = async (id) => {
  try {
    await client.connect();
    const usersCollection = client.db("development").collection("users");
    const user = await usersCollection.findOne(ObjectId(id));
    if (user) {
      return user;
    }
    throw new Error("NO_USER_FOUND");
  } finally {
    await client.close();
  }
};

export { client, testConnection, insertUser, findUserByEmail, findUserById };
