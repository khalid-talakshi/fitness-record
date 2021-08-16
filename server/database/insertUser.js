import { client } from "./client";

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

export { insertUser };
