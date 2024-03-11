import { Request, Response, NextFunction } from "express";
import { SendError } from "@utils/apiError";
import * as laptopService from "@services/laptopService";
import { Gallery, Prisma } from "@prisma/client";
import { uploadImage, bulkUploadImage, uploadVideos } from "../libs/imagekit";

async function getAllLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const laptops = await laptopService.getAllLaptop();
    res.status(200).json({
      message: "success",
      laptops,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

async function getOneLaptop(
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

async function createOneLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const laptop = req.body as Prisma.LaptopUncheckedCreateInput;

    interface MulterFiles {
      [fieldname: string]: Express.Multer.File[];
    }

    const files = req.files as MulterFiles;
    const thumb = files?.["thumb"]?.[0];
    const videos = files?.["videos"]?.[0];
    const gallery = files?.["gallery"];

    let galleries: Array<{ id?: string; image?: string }> = [];
    if (thumb) {
      const thumbData = await uploadImage(thumb);
      laptop.thumbId = thumbData.fileId;
      laptop.thumb = thumbData.url;
    }

    if (gallery) {
      const galleryData = await bulkUploadImage(gallery);
      galleries = galleryData.map((gal) => {
        return {
          id: gal.fileId,
          image: gal.url,
        };
      });
    }
    if (videos) {
      const videosData = await uploadVideos(videos);
      laptop.videosId = videosData.fileId;
      laptop.videos = videosData.url;
    }
    const createdLaptop = await laptopService.createOneLaptop(
      laptop,
      galleries
    );
    res.status(201).json({
      message: "success",
      laptop: createdLaptop,
    });
  } catch (err) {
    console.info(err);
    next(new SendError("internal server error", 500));
  }
}

async function updateOneLaptop(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const laptopId: string = req.params.id;
    const laptop: Prisma.LaptopUncheckedCreateInput = req.body;
    const galleries: Array<Gallery> = req.body.galleries;
    const createdLaptop = await laptopService.updateOneLaptop(
      laptopId,
      laptop,
      galleries
    );
    res.status(201).json({
      message: "success",
      laptop: createdLaptop,
    });
  } catch (err) {
    console.info(err);
    next(new SendError("internal server error", 500));
  }
}

export { getAllLaptop, getOneLaptop, createOneLaptop, updateOneLaptop };
