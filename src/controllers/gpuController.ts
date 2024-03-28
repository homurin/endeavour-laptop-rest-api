import { Request, Response, NextFunction } from "express";
import * as gpuService from "@services/gpuService";
import { SendError } from "../utils/apiError";
import { GpuGetAllQuery } from "@/src/types/gpu";

export async function getAllCpu(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = req.query as GpuGetAllQuery;

    const gpus = await gpuService.getAllGpu(query);

    res.status(200).json({
      message: "success",
      metadata: {
        total_count: gpus.totalCount,
        data_count: gpus.dataCount,
      },
      gpus: gpus.data,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

export async function getOneGpu(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id: string = req.params.id;
    const gpu = await gpuService.getOneGpu(id);

    res.status(200).json({
      message: "success",
      gpu,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}
