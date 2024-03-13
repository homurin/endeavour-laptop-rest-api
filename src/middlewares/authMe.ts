import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";
import { verifyToken } from "../libs/jwt";
import { AdminProfile } from "../types/admin";
import { isAdminExists } from "../services/adminService";
import { JsonWebTokenError } from "jsonwebtoken";

export async function authMe(req: Request, res: Response, next: NextFunction) {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      return next(new SendError("login required", 401));
    }
    const token = bearer.split("Bearer ")[1];
    const verify = await verifyToken(token);
    const payload = verify as AdminProfile;

    if (payload) {
      const isExists = await isAdminExists(payload?.id);
      if (!isExists) {
        return next(new SendError("user not found", 404));
      }
    }
    req.user = payload;
    next();
  } catch (err) {
    console.info(err);
    const error = err as Error;
    if (error instanceof JsonWebTokenError) {
      next(new SendError(error.message, 400));
    }
    next(new SendError("error when checking authme", 500));
  }
}
