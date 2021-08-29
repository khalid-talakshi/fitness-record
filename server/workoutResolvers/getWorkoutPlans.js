import { findWorkoutPlanByUser } from "../database";

async function getWorkoutPlans(parent, args, context, info) {
  const { userId } = context;
  try {
    const plansFromDb = await findWorkoutPlanByUser(userId);
    const plans = plansFromDb.map((item) => ({ ...item, id: item._id }));
    return plans;
  } catch (error) {
    return null;
  }
}

export { getWorkoutPlans };
