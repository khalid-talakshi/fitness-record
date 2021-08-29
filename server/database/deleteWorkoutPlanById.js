import { ObjectId } from "bson";
import { client } from "./client";

const deleteWorkoutPlanById = async (workoutId) => {
  try {
    await client.connect();
    const workoutsCollection = client
      .db("development")
      .collection("workoutPlans");
    const workoutRes = await workoutsCollection.deleteOne({
      _id: ObjectId(workoutId),
    });
    if (workoutRes.deletedCount === 0) {
      throw new Error("NO_WORKOUT_PLAN_FOUND");
    }
  } finally {
    await client.close();
  }
};

export { deleteWorkoutPlanById };
