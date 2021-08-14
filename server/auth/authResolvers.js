import { insertUser, finduser } from "../database/database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  try {
    const userRes = await insertUser(args.name, args.email, password);
    const user = userRes[0];
    const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
    return {
      result: {
        token,
        user,
      },
      error: null,
    };
  } catch (error) {
    if (error.message === "EXISTING_USER") {
      return {
        result: null,
        error: {
          name: "EXISTING_USER",
          message: "User already exists, please try a different email",
        },
      };
    }
  }
}

async function login(parent, args, context, info) {
  try {
    const user = await finduser(args.email);
    const valid = await bcrypt.compare(args.password, user.password);
    if (!valid) {
      throw new Error("INVALID_PASSWORD");
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    return {
      result: {
        token,
        user,
      },
      error: null,
    };
  } catch (error) {
    let errorObj;
    switch (error.message) {
      case "NO_USER_FOUND":
        errorObj = {
          name: "NO_USER_FOUND",
          message: "Couldn't find a user with that email",
        };
        break;
      case "INVALID_PASSWORD":
        errorObj = {
          name: "INVALID_PASSWORD",
          message:
            "The password you tried to submit was incorrect, please try again",
        };
        break;
      default:
        errorObj = {
          name: "UNSPECIFIED_ERROR",
          message: "Something went wrong, please try again",
        };
    }
    return {
      result: null,
      error: errorObj,
    };
  }
}

export { signup, login };
