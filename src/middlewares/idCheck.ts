import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";
import { getOneLaptop } from "@services/laptopService";
import { getOneApp } from "@services/applicationService";
import { getOneCpu } from "@services/cpuService";
import { getOneGpu } from "../services/gpuService";
import { getOneWindows } from "../services/windowsService";
import { isAdminExists } from "../services/adminService";

export async function laptopIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }

    const isExists = await getOneLaptop(req.params.id);

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

    const isExists = await getOneApp(req.params.id);

    if (!isExists) {
      next(new SendError("application not found", 404));
    }

    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}
export async function adminIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }

    const isExists = await isAdminExists(req.params.id);

    if (!isExists) {
      next(new SendError("admin not found", 404));
    }

    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}

export async function cpuIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }
    const isExists = await getOneCpu(req.params.id);
    if (!isExists) {
      next(new SendError("cpu not found", 404));
    }
    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}
export async function gpuIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }
    const isExists = await getOneGpu(req.params.id);
    if (!isExists) {
      next(new SendError("gpu not found", 404));
    }
    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}

export async function windowsIdCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req?.params?.id) {
      return next(new SendError("id is required", 400));
    }
    const isExists = await getOneWindows(req.params.id);
    if (!isExists) {
      next(new SendError("windows version not found", 404));
    }
    next();
  } catch (err) {
    next(new SendError("failed id check process", 500));
  }
}
