import multer, { FileFilterCallback } from "multer";
import { Request, Express } from "express";
import { SendError } from "../utils/apiError";

const storage = multer.memoryStorage();

function imagesFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  const allowedMimeType = ["image/png", "image/jpg", "image/jpeg"];
  const isAllowedMimeType = allowedMimeType.includes(file.mimetype);
  if (isAllowedMimeType) {
    return cb(null, true);
  }
  return cb(new SendError("invalid image extensions", 413));
}

function videosFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  const allowedMimeType = [
    "video/3gp",
    "video/mp4",
    "video/MPEG-4",
    "video/mkv",
  ];
  const isAllowedMimeType = allowedMimeType.includes(file.mimetype);
  if (isAllowedMimeType) {
    return cb(null, true);
  }
  return cb(new SendError("invalid image extensions", 413));
}

export const images = multer({ storage, fileFilter: imagesFilter });
export const videos = multer({ storage, fileFilter: videosFilter });
export const imagesVideos = multer({ storage });
