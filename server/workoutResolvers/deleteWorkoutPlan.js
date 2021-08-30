import { deleteWorkoutPlanById, findWorkoutPlanByUser } from "../database";

async function deleteWorkoutPlan(parent, args, context, info) {
  const { userId } = context;
  try {
    await deleteWorkoutPlanById(args.workoutId);
    const plans = await findWorkoutPlanByUser(userId);
    return {
        result: plans,
        error: null,
    }
  } catch (err) {
    let errObj;
    switch (err.message) {
      case "NO_WORKOUT_PLAN_FOUND":
        errObj = {
          name: err.message,
          message: "Failed to find workout plan for deletion",
        };
      default:
        errObj = {
          name: "FAILED_TO_DELETE_PLAN",
          message: "Failed to delete workout plan, please try again",
        };
    }
    return {
      result: null,
      error: errObj,
    };
  }
}

export { deleteWorkoutPlan };
