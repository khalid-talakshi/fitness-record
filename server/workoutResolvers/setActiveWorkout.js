import { setActiveWorkoutOnUser, findUserById } from "../database";

async function setActiveWorkout(parent, args, context, info) {
  const { userId } = context;
  try {
    await setActiveWorkoutOnUser(userId, args.workoutId);
    const user = await findUserById(userId);
    if (user) {
      return { result: user, error: null };
    }
    throw new Error("NO_USER_FOUND");
  } catch (err) {
    let errObj;
    switch (err.message) {
      case "NO_USER_FOUND":
        errObj = {
          name: err.message,
          message: "Failed to find user",
        };
      default:
        errObj = {
          name: "FAILED_TO_SET_ACTIVE",
          message: "Failed to set active workout, please try again",
        };
    }
    return {
      result: null,
      error: errObj,
    };
  }
}

export { setActiveWorkout };
