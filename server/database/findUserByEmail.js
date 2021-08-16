import { client } from "./client";

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

export { findUserByEmail };
