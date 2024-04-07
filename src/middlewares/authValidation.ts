import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";
import { Admin } from "../types/admin";
import validator from "validator";

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

export async function checkRequiredUpdateField(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body as Admin;

    if (body.password && validator.isEmpty(body.password)) {
      return next(new SendError("password cannot be empty", 400));
    }
    if (body.email && !validator.isEmail(body.email)) {
      return next(new SendError("invalid email", 400));
    }
  } catch (err) {
    next(new SendError("error when checking update field", 500));
  }
}
