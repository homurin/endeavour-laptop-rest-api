import ImageKit from "imagekit";
import dotenv from "dotenv";
import path from "path";
import { MulterError } from "multer";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function uploadImage(image: Express.Multer.File) {
  const allowedMimetype = ["image/png", "image/jpg", "image/jpeg"];
  const isAllowedImageMimetype = allowedMimetype.includes(image.mimetype);
  if (!isAllowedImageMimetype) {
    throw new MulterError("LIMIT_UNEXPECTED_FILE", image.fieldname);
  }
  if (maxMbFileSize(image.size, 5)) {
    throw new MulterError("LIMIT_FILE_SIZE", image.fieldname);
  }
  const filename = image.originalname;
  const extname = path.extname(filename);
  const uploadedImage = await imagekit.upload({
    file: image.buffer,
    fileName: `IMG-${Date.now()}.${extname}`,
  });
  return {
    fileId: uploadedImage.fileId,
    url: uploadedImage.url,
  };
}

export async function uploadVideos(videos: Express.Multer.File) {
  const allowedMimetype = [
    "video/3gp",
    "video/mp4",
    "video/MPEG-4",
    "video/mkv",
  ];
  const isAllowedMimetype = allowedMimetype.includes(videos.mimetype);
  if (maxMbFileSize(videos.size, 25)) {
    throw new MulterError("LIMIT_FILE_SIZE", videos.fieldname);
  }
  const filename = videos.originalname;
  const extname = path.extname(filename);
  if (isAllowedMimetype) {
    throw new MulterError("LIMIT_UNEXPECTED_FILE", videos.fieldname);
  }
  const uploadedVideos = await imagekit.upload({
    file: videos.buffer,
    fileName: `MOV-${Date.now()}.${extname}`,
  });
  return {
    fileId: uploadedVideos.fileId,
    url: uploadedVideos.url,
  };
}
export async function bulkUploadImage(images: Express.Multer.File[]) {
  const data = [];
  const allowedMimetype = ["image/png", "image/jpg", "image/jpeg"];
  for (const image of images) {
    const isAllowedImageMimetype = allowedMimetype.includes(image.mimetype);
    if (!isAllowedImageMimetype) {
      throw new MulterError("LIMIT_UNEXPECTED_FILE", image.fieldname);
    }
    if (maxMbFileSize(image.size, 5)) {
      throw new MulterError("LIMIT_FILE_SIZE", image.fieldname);
    }
    const filename = image.originalname;
    const extname = path.extname(filename);
    const uploadImage = await imagekit.upload({
      file: image.buffer,
      fileName: `IMG-${Date.now()}.${extname}`,
    });
    data.push({
      fileId: uploadImage.fileId,
      url: uploadImage.url,
    });
  }
  return data;
}

export async function deleteOneFiles(fileId: string) {
  await imagekit.deleteFile(fileId);
}

export async function bulkDeleteFiles(fileId: string[]) {
  await imagekit.bulkDeleteFiles(fileId);
}

function maxMbFileSize(fileSize: number, maxMbSize: number): boolean {
  return fileSize > 1000000 * maxMbSize;
}
