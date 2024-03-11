import { Request, Response, NextFunction } from "express";
import { SendError } from "../utils/apiError";
import multer from "multer";

export async function laptopMulterValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    interface MulterFiles {
      [fieldname: string]: Express.Multer.File[];
    }

    const files = req.files as MulterFiles;

    const thumb = files?.["thumb"]?.[0];
    const videos = files?.["videos"]?.[0];
    const galleries = files?.["gallery"];

    if (thumb) {
      const isAllowedThumb: boolean = isAllowedImagesMimetype(thumb.mimetype);
      if (!isAllowedThumb) {
        return next(new SendError("invalid thumbnail extension", 400));
      }

      const isReachMaxSize = maxMbFileSize("thumb", thumb.size, 10);

      if (isReachMaxSize.isReached) {
        return next(new SendError(isReachMaxSize.message, 400));
      }
    }
    if (videos) {
      const isAllowedVideos: boolean = isAllowedVideosMimetype(videos.mimetype);
      if (!isAllowedVideos) {
        return next(new SendError("invalid videos extension", 400));
      }

      const isReachMaxSize = maxMbFileSize("videos", videos.size, 50);

      if (isReachMaxSize.isReached) {
        return next(new SendError(isReachMaxSize.message, 400));
      }
    }
    if (galleries) {
      for (const gallery of galleries) {
        const isAllowedGallery = isAllowedImagesMimetype(gallery.mimetype);

        if (gallery && !isAllowedGallery) {
          return next(new SendError("invalid gallery extension", 400));
        }

        const isReachMaxSize = maxMbFileSize("gallery", gallery.size, 10);
        if (isReachMaxSize.isReached) {
          return next(new SendError(isReachMaxSize.message, 400));
        }
      }
    }
    next();
  } catch (err) {
    if (err instanceof multer.MulterError) {
      return next(new SendError("Unexpected field", 400));
    }
  }
}

function isAllowedVideosMimetype(mimetype: string): boolean {
  const videoAllowedMimeType = [
    "video/3gp",
    "video/mp4",
    "video/MPEG-4",
    "video/mkv",
  ];
  return videoAllowedMimeType.includes(mimetype);
}

function isAllowedImagesMimetype(mimetype: string): boolean {
  const imageAllowedMimeType = ["image/png", "image/jpg", "image/jpeg"];
  return imageAllowedMimeType.includes(mimetype);
}

function maxMbFileSize(
  fieldname: string = "fields",
  fileSize: number,
  maxMbSize: number
): { message: string; isReached: boolean } {
  if (fileSize > 1000000 * maxMbSize) {
    return {
      isReached: true,
      message: `${fieldname} size has reached the maximum size!`,
    };
  }
  return {
    isReached: false,
    message: `${fieldname} size not reached the maximum size!`,
  };
}
