import { client } from "./client";
import { ObjectId } from "mongodb";

const findWorkoutPlanByUser = async (userId) => {
  try {
    await client.connect();
    const workoutPlanCollection = client
      .db("development")
      .collection("workoutPlans");
    const plans = await workoutPlanCollection.find({ createdBy: userId });
    const plansArray = await (
      await plans.toArray()
    ).map((item) => {
      const doc = { ...item, id: item._id };
      delete doc._id;
      return doc;
    });
    return plansArray;
  } catch (err) {
    console.log("Error In Finding Workout Plans", err);
  } finally {
    await client.close();
  }
};

export { findWorkoutPlanByUser };
