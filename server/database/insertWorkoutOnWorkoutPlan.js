import { ObjectId } from "mongodb";
import { client } from "./client";

async function insertWorkoutOnWorkoutPlan(workoutId, name) {
  try {
    await client.connect();
    const workoutsCollection = client
      .db("development")
      .collection("workoutPlans");
    const res = await workoutsCollection.findOne({ _id: ObjectId(workoutId) });
    if (!res) {
      throw new Error("WORKOUT_PLAN_NOT_FOUND");
    }
    const updateResult = await workoutsCollection.updateOne(
      { _id: ObjectId(workoutId) },
      { $set: { workouts: [...res.workouts, { name, exercises: [] }] } }
    );
    if (updatedResult.modifiedCount === 1) {
      const doc = await workoutsCollection.findOne({
        _id: ObjectId(workoutId),
      });
      const docToReturn = { ...doc, id: doc._id };
      delete docToReturn._id;
      return {
        result: docToReturn,
        error: null,
      };
    }
    throw new Error("FAILED_TO_ADD_WORKOUT");
  } finally {
    await client.close();
  }
}

export { insertWorkoutOnWorkoutPlan };
