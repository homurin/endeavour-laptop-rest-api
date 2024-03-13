import { Request, Response, NextFunction } from "express";
import * as imagekit from "@libs/imagekit";
import { SendError } from "@utils/apiError";
import { Prisma } from "@prisma/client";
import * as Laptop from "@repository/laptopRepository";
import * as Gallery from "@repository/galleryRepository";
import MulterFiles from "../types/express/multer";
import { AppRequestBody } from "../types/application";
import { MulterError } from "multer";

export async function uploadLaptopMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const laptop = req.body as Prisma.LaptopUncheckedCreateInput;
    const files = req.files as MulterFiles;
    const thumb = files?.["thumb"]?.[0];
    const videos = files?.["videos"]?.[0];
    const gallery = files?.["gallery"];

    if (thumb) {
      const thumbData = await imagekit.uploadImage(thumb);
      laptop.thumbId = thumbData.fileId;
      laptop.thumb = thumbData.url;
    }

    if (gallery) {
      const galleryData = await imagekit.bulkUploadImage(gallery);
      const data = galleryData.map((gal) => {
        return {
          id: gal.fileId,
          image: gal.url,
        };
      });
      req.galleries = data;
    }
    if (videos) {
      const videosData = await imagekit.uploadVideos(videos);
      laptop.videosId = videosData.fileId;
      laptop.videos = videosData.url;
    }
    next();
  } catch (err) {
    const error = err as Error;
    if (error instanceof MulterError) {
      return next(new SendError(`${error.message} at ${error.field}`, 400));
    }
    next(new SendError("failed upload", 413));
  }
}
export async function updateUploadLaptopMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const laptopId = req.params.id;
    const deletedGalleryReq: string[] = req.body?.deletedGallery;
    const laptop = await Laptop.getOneFullDesc(laptopId);
    const files = req.files as MulterFiles;
    const thumb = files?.["thumb"]?.[0];
    const videos = files?.["videos"]?.[0];

    if (deletedGalleryReq && deletedGalleryReq.length > 0) {
      await imagekit.bulkDeleteFiles(deletedGalleryReq);
      await Gallery.removeGalleryByLaptopId(laptopId);
      delete req.body.deletedGallery;
    }
    if (thumb && laptop?.thumbId) {
      await imagekit.deleteOneFiles(laptop.thumbId as string);
    }

    if (videos && laptop?.videosId) {
      await imagekit.deleteOneFiles(laptop.videosId as string);
    }

    next();
  } catch (err) {
    const error = err as Error;
    console.info(error.name);
    next(new SendError(error.message, 404));
  }
}

export async function uploadAppMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const laptop = req.body as AppRequestBody;
    const files = req.files as MulterFiles;
    const headerImage = files?.["headerImage"][0];
    const screenshots = files?.["screenshots"][0];
    const movies = files?.["movies"][0];

    if (headerImage) {
      const uploaded = await imagekit.uploadImage(headerImage);
      laptop.headerImageId = uploaded.fileId;
      laptop.headerImage = uploaded.url;
    }
    if (screenshots) {
      const uploaded = await imagekit.uploadImage(headerImage);
      laptop.screenshotsId = uploaded.fileId;
      laptop.screenshots = uploaded.url;
    }
    if (movies) {
      const uploaded = await imagekit.uploadVideos(headerImage);
      laptop.moviesId = uploaded.fileId;
      laptop.movies = uploaded.url;
    }
    next();
  } catch (err) {
    const error = err as Error;
    if (error instanceof MulterError) {
      return next(new SendError(`${error.message} at ${error.field}`, 400));
    }
    next(new SendError("error when upload file", 500));
  }
}
