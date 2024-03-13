import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret: string = process.env.JWT_SECRET || "";

export async function createToken(payload: string): Promise<string> {
  try {
    return jwt.sign(payload, jwtSecret);
  } catch (err) {
    throw err;
  }
}
export async function verifyToken(token: string) {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (err) {
    throw err;
  }
}
