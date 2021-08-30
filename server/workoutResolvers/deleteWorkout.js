import { deleteWorkoutOnWorkoutPlan } from "../database";

async function deleteWorkout(parent, args, context, info) {
  try {
    const workoutPlan = await deleteWorkoutOnWorkoutPlan(
      args.workoutId,
      args.planId
    );
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
      case "FAILED_TO_REMOVE_WORKOUT":
        errObj = {
          name: err.message,
          message:
            "Something went wrong with removing the workout to the workout plan, please try again",
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

export { deleteWorkout };
