import { findWorkoutPlanByUser } from "../database";

async function getWorkoutPlans(parent, args, context, info) {
  const { userId } = context;
  try {
    const plans = await findWorkoutPlanByUser(userId);
    return plans;
  } catch (error) {
    return null;
  }
}

export { getWorkoutPlans };
