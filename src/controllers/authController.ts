import { Request, Response, NextFunction } from "express";
import * as adminService from "@services/adminService";
import { SendError } from "../utils/apiError";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const username: string = req?.body?.username;
    const password: string = req?.body?.password;
    const { token, user } = await adminService.generateToken(
      username,
      password
    );
    res.status(200).json({
      status: "success",
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
