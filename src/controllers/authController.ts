import { Request, Response, NextFunction } from "express";
import * as adminService from "@services/adminService";
import { SendError } from "../utils/apiError";
import { Admin, AdminProfile } from "../types/admin";
import { verifyToken } from "../libs/jwt";

export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    res.status(200).json({
      message: "success",
      admin: user,
    });
  } catch (err) {
    const e = err as Error;

    if (e instanceof SendError) {
      return next(new SendError(e.message, e.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const username: string = req?.body?.username;
    const password: string = req?.body?.password;
    const { token, user } = await adminService.generateToken(
      username,
      password
    );
    res.status(200).json({
      message: "success",
      user,
      token,
    });
  } catch (err) {
    const error = err as Error;
    if (error instanceof SendError) {
      return next(new SendError(error.message, error.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      throw new SendError("user not found", 404);
    }
    const id: string = req.user?.id;
    const body = req.body as Admin;
    console.log(body);
    const { data, token } = await adminService.update(id, body);

    res.status(200).json({
      message: "success",
      admin: data,
      token,
    });
  } catch (err) {
    const error = err as Error;
    if (error instanceof SendError) {
      return next(new SendError(error.message, error.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}
