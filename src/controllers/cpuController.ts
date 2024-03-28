import { Request, Response, NextFunction } from "express";
import * as cpuService from "@services/cpuService";
import { SendError } from "../utils/apiError";
import { CpuGetAllQuery } from "../types/cpu";

export async function getAllCpu(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = req.query as CpuGetAllQuery;

    const cpus = await cpuService.getAllCpu(query);

    res.status(200).json({
      message: "success",
      metadata: {
        total_count: cpus.totalCount,
        data_count: cpus.dataCount,
      },
      cpus: cpus.data,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

export async function getOneCpu(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id: string = req.params.id;
    const cpu = await cpuService.getOneCpu(id);

    res.status(200).json({
      message: "success",
      cpu,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}
