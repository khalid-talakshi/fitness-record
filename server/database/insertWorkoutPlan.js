import { ObjectId } from "mongodb";
import { client } from "./client";

async function insertWorkoutPlan(name, createdBy) {
  try {
    await client.connect();
    const workoutsCollection = client
      .db("development")
      .collection("workoutPlans");
    const res = await workoutsCollection.insertOne({
      name,
      createdBy,
      workouts: [],
      active: false,
    });
    if (res.insertedId) {
      const document = await workoutsCollection.findOne({
        id: ObjectId(res.insertedId),
      });
      return document;
    }
    throw new Error("WORKOUT_INSERT_FAILED");
  } finally {
    await client.close();
  }
}

export { insertWorkoutPlan };
