import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";
import { getOne } from "../repository/laptopRepository";

export async function idCheck(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }
    const isExists = await getOne(req.params.id);
    if (!isExists) {
      return next(new SendError("laptop not found", 404));
    }
    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}
