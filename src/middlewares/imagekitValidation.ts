import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import * as imagekit from "@libs/imagekit";
import { SendError } from "../utils/apiError";
import MulterFiles from "../types/multer";

export async function uploadAppMediaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as MulterFiles;

    const headerImage = files?.["headerImage"];
    const screenshots = files?.["screenshots"];
    const movies = files?.["movies"];

    if (headerImage) {
      if (headerImage.length > 1) {
        throw new MulterError("LIMIT_FIELD_COUNT", "headerImage");
      }
      await imagekit.isValidImages(headerImage[0]);
    }
    if (screenshots) {
      if (screenshots.length > 1) {
        throw new MulterError("LIMIT_FIELD_COUNT", "screenshots");
      }
      await imagekit.isValidImages(screenshots[0]);
    }
    if (movies) {
      if (movies.length > 1) {
        throw new MulterError("LIMIT_FIELD_COUNT", "movies");
      }
      await imagekit.isValidVideos(movies[0]);
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
export async function uploadLaptopMediaValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const files = req.files as MulterFiles;
    const thumbRequest = files?.["thumb"];
    const videosRequest = files?.["videos"];
    const galleryRequest = files?.["gallery"];

    if (thumbRequest) {
      if (thumbRequest.length > 1) {
        throw new MulterError("LIMIT_FIELD_COUNT", "thumb");
      }
      const thumb = thumbRequest[0];
      await imagekit.isValidImages(thumb);
    }

    if (videosRequest) {
      if (videosRequest.length > 1) {
        throw new MulterError("LIMIT_FIELD_COUNT", "videos");
      }
      const videos = videosRequest[0];
      await imagekit.isValidVideos(videos);
    }

    if (galleryRequest) {
      if (galleryRequest.length > 10) {
        throw new MulterError("LIMIT_FIELD_COUNT", "gallery");
      }
      const gallery = galleryRequest;
      await imagekit.bulkIsValidImages(gallery);
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
