import { insertWorkoutPlan } from "../database";

async function createWorkoutPlan(parent, args, context, info) {
  const { userId } = context;
  try {
    const workoutPlan = await insertWorkoutPlan(args.name, userId);
    return { result: { ...workoutPlan, id: workoutPlan._id }, error: null };
  } catch (err) {
    let errObj;
    switch (err.message) {
      case "WORKOUT_INSERT_FAILED":
        errObj = {
          name: err.message,
          message: "Failed to create workout plan, please try again",
        };
        break;
      default:
        errObj = {
          name: "UNSPECIFIED_ERROR",
          message: "Something went wrong, please try again",
        };
        break;
    }
    return { result: null, error: errObj };
  }
}

export { createWorkoutPlan };
