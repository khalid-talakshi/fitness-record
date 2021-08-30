import { client } from "./client";
import { ObjectId } from "mongodb";

const findWorkoutPlanById = async (id) => {
  try {
    await client.connect();
    const workoutCollection = client
      .db("development")
      .collection("workoutPlans");
    const workoutPlan = await workoutCollection.findOne({ _id: ObjectId(id) });
    if (workoutPlan) {
      const workoutToReturn = { ...workoutPlan, id: workoutPlan._id };
      delete workoutToReturn._id;
      return workoutToReturn;
    } else {
      throw new Error("NO_WORKOUT_PLAN_FOUND");
    }
  } finally {
    await client.close();
  }
};

export { findWorkoutPlanById };
