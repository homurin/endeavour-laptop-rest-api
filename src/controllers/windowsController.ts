import { Request, Response, NextFunction } from "express";
import * as windowsService from "@services/windowsService";
import { SendError } from "@utils/apiError";
import { WindowsGetAllQuery } from "@/src/types/windows";

export async function getAllWindows(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = req.query as WindowsGetAllQuery;
    const windows = await windowsService.getAllWindows(query);

    res.status(200).json({
      message: "success",
      metadata: {
        total_count: windows.totalCount,
        data_count: windows.dataCount,
      },
      windows: windows.data,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

export async function getOneWindows(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id: string = req.params.id;
    const windows = await windowsService.getOneWindows(id);

    res.status(200).json({
      message: "success",
      windows,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}
