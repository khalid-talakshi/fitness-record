import { insertUser } from "../../database";
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

export { signup };
