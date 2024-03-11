import ImageKit from "imagekit";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "",
});

export async function uploadImage(image: Express.Multer.File) {
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
  const filename = videos.originalname;
  const extname = path.extname(filename);
  const uploadedVideos = await imagekit.upload({
    file: videos.buffer,
    fileName: `IMG-${Date.now()}.${extname}`,
  });
  return {
    fileId: uploadedVideos.fileId,
    url: uploadedVideos.url,
  };
}
export async function bulkUploadImage(images: Express.Multer.File[]) {
  const data = [];
  for (const image of images) {
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

export default imagekit;
