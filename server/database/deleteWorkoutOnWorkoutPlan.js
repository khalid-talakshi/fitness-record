import { ObjectId } from "bson";
import { client } from "./client";

const deleteWorkoutOnWorkoutPlan = async (workoutId, planId) => {
  try {
    await client.connect();
    const workoutsCollection = client
      .db("development")
      .collection("workoutPlans");
    const workoutPlan = await workoutsCollection.findOne({
      _id: ObjectId(planId),
    });
    if (!workoutPlan) {
      throw new Error("WORKOUT_PLAN_NOT_FOUND");
    }
    const filteredWorkouts = workoutPlan.workouts.filter((item) => {
      return item.id.toString() !== workoutId;
    });
    const res = await workoutsCollection.findOneAndUpdate(
      { _id: ObjectId(planId) },
      { $set: { workouts: [...filteredWorkouts] } }
    );
    if (res.value && res.ok) {
      const returnVal = { ...res.value, id: res.value._id };
      delete returnVal._id;
      return returnVal;
    }
    throw new Error("FAILED_TO_REMOVE_WORKOUT");
  } finally {
    await client.close();
  }
};

export { deleteWorkoutOnWorkoutPlan };
