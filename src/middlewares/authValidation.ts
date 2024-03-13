import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";

export async function checkRequiredLoginFields(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const username = req?.body?.username;
    const password = req?.body?.password;
    if (!username || !password) {
      next(new SendError("fill required fields", 400));
    }
    next();
  } catch (err) {
    next(new SendError("error when checking login fields", 500));
  }
}
