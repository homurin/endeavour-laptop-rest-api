import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";
import * as laptopService from "@services/laptopService";
import * as appService from "@services/applicationService";

export async function laptopIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }
    const isExists = await laptopService.getOneLaptop(req.params.id);
    if (!isExists) {
      return next(new SendError("laptop not found", 404));
    }
    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}
export async function appIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }
    const isExists = await appService.isExists(req.params.id);
    if (!isExists) {
      next(new SendError("application not found", 404));
    }
    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}
