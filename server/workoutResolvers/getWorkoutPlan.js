import { findWorkoutPlanById } from "../database";

async function getWorkoutPlan(parent, args, context, info) {
  try {
    console.log(args.workoutId);
    const plan = await findWorkoutPlanById(args.workoutId);
    return plan;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export { getWorkoutPlan };
