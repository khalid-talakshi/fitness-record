import { client } from "./client";
import { ObjectId } from "mongodb";

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

export { findUserById };
