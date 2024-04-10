import { Request, Response, NextFunction } from "express";
import { BrandGetAllQuery } from "../types/brand";
import * as brandService from "@services/brandService";
import { SendError } from "../utils/apiError";

export async function getAllBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const query = req.query as BrandGetAllQuery;
    const brands = await brandService.getAll(query);
    res.status(200).json({
      metadata: {
        total_count: brands.totalCount,
        data_count: brands.dataCount,
      },
      message: "success",
      brands: brands.data,
    });
  } catch (err) {
    const e = err as Error;
    if (e instanceof SendError) {
      return next(new SendError(e.message, e.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}
