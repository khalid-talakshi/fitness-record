import { client } from "./client";
import { ObjectId } from "mongodb";

const findUserById = async (id) => {
  try {
    await client.connect();
    const usersCollection = client.db("development").collection("users");
    const user = await usersCollection.findOne({_id: ObjectId(id)});
    console.log(user);
    if (user) {
      const userToReturn = {...user, id: user._id}
      delete userToReturn._id;
      console.log(userToReturn);
      return userToReturn;
    }
    throw new Error("NO_USER_FOUND");
  } finally {
    await client.close();
  }
};

export { findUserById };
