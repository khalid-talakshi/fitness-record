import { ObjectId } from "bson";
import { client } from "./client";

const setActiveWorkoutOnUser = async (userId, workoutId) => {
  try {
    await client.connect();
    const usersCollection = client.db("development").collection("users");
    const workoutsCollection = client
      .db("development")
      .collection("workoutPlans");
    const userRes = await usersCollection.updateOne(
      { _id: ObjectId(userId) },
      { $set: { activeWorkoutPlan: workoutId } }
    );
    const workoutRes = await workoutsCollection.updateOne(
      { _id: ObjectId(workoutId) },
      { $set: { active: true } }
    );
  } finally {
    await client.close();
  }
};

export {setActiveWorkoutOnUser}
