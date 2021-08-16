import { findUserById } from "../../database";

async function getUserDetails(parent, args, context, info) {
  const { userId } = context;
  try {
    const user = await findUserById(userId);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { getUserDetails };
