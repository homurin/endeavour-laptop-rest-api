import { Request, Response, NextFunction } from "express";
import { SendError } from "@utils/apiError";
import * as laptopService from "@services/laptopService";
import { LaptopGetAllQuery, LaptopRequestBody } from "../models/laptop";

export async function getAllLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let query: LaptopGetAllQuery = {};

    if (req.query) {
      query = req.query;
    }

    const laptops = await laptopService.getAllLaptop(query);
    res.status(200).json({
      message: "success",
      total: laptops.count,
      showed: laptops.showedLength,
      laptops: laptops.data,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

export async function getOneLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id: string = req.params.id;
    if (!id) {
      return next(new SendError("id cannot be null", 400));
    }
    const laptop = await laptopService.getOneLaptop(id);
    if (!laptop) {
      return next(new SendError("laptop not found", 404));
    }
    res.status(200).json({
      message: "success",
      laptop,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

export async function createOneLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const laptop = req.body as LaptopRequestBody;
    if (req.user) {
      laptop.adminId = req.user.id;
    }
    const createdLaptop = await laptopService.createOneLaptop(laptop);
    res.status(201).json({
      message: "success",
      laptop: createdLaptop,
    });
  } catch (err) {
    console.info(err);
    next(new SendError("internal server error", 500));
  }
}

export async function updateOneLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id: string = req.params.id;

    const laptop = req.body as LaptopRequestBody;

    if (req.user) {
      laptop.adminId = req.user.id;
    }

    const updatedLaptop = await laptopService.updateOneLaptop(id, laptop);
    res.status(200).json({
      message: "success",
      laptop: updatedLaptop,
    });
  } catch (err) {
    const error = err as Error;
    if (error instanceof SendError) {
      next(new SendError(error.message, error.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}

export async function deleteOneLaptop(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id: string = req.params.id;
    await laptopService.deleteOneLaptop(id);
    res.status(200).json({
      message: `record has been successfull deleted`,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}
