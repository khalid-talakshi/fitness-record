import { insertWorkoutOnWorkoutPlan } from "../database";

async function addWorkout(parent, args, context, info) {
  const { userId } = context;
  try {
    const workoutPlan = await insertWorkoutOnWorkoutPlan(
      args.workoutId,
      args.name
    );
    console.log(workoutPlan);
    return { result: workoutPlan, error: null };
  } catch (err) {
      console.log(err.message);
    let errObj;
    switch (err.message) {
      case "WORKOUT_PLAN_NOT_FOUND":
        errObj = {
          name: err.message,
          message: "Could not find the workout plan",
        };
        break;
      case "FAILED_TO_ADD_WORKOUT":
        errObj = {
          name: err.message,
          message:
            "Something went wrong with adding the workout to the workout plan, please try again",
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

export { addWorkout };
