import { insertUser } from "../database/database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const userRes = await insertUser(args.name, args.email, password);
  const user = userRes[0];
  console.log(user);
  const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET);
  return {
    token,
    user,
  };
}

export { signup };

// async function login(parent, args, context, info) {
//   const user = await context.prisma.user.findUnique({
//     where: { email: args.email },
//   });
//   if (!user) {
//     throw new Error("No such user found");
//   }
//   const valid = await bcrypt.compare(args.password, user.password);
//   if (!valid) {
//     throw new Error("Invalid password");
//   }
//   const token = jwt.sign({ userId: user.id }, APP_SECRET);
//   return {
//     token,
//     user,
//   };
// }
