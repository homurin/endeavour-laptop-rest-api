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

    if (body.username === "") {
      return next(new SendError("username cannot be empty", 400));
    }
    if (body.username) {
      if (validator.isEmpty(body.username, { ignore_whitespace: true })) {
        return next(new SendError("username cannot be empty", 400));
      }
      if (body.username.length < 5) {
        return next(new SendError("username length lower than 5 char", 400));
      }
    }

    if (body.fullName === "") {
      return next(new SendError("full name cannot be empty", 400));
    }
    if (body.fullName) {
      if (validator.isEmpty(body.fullName, { ignore_whitespace: true })) {
        return next(new SendError("fullname cannot be empty", 400));
      }
      if (body.fullName.length < 5) {
        return next(new SendError("full name length lower than 5 char", 400));
      }
    }

    if (body.password === "") {
      return next(new SendError("password cannot be empty", 400));
    }
    if (body.password) {
      if (validator.isEmpty(body.password, { ignore_whitespace: true })) {
        return next(new SendError("password cannot be empty", 400));
      }
      if (body.password.length < 9) {
        return next(new SendError("password length lower than 9 char", 400));
      }
    }
    next();
  } catch (err) {
    console.log(err);
    next(new SendError("error when checking update field", 500));
  }
}
