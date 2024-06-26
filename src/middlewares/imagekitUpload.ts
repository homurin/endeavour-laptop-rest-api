import { Request, Response, NextFunction } from "express";
import { MulterError } from "multer";
import * as imagekit from "@libs/imagekit";
import { SendError } from "@utils/apiError";
import * as Laptop from "@repository/laptopRepository";
import * as applicationService from "@services/applicationService";
import { AppRequestBody } from "@/src/types/application";
import MulterFiles from "@/src/types/multer";
import { LaptopRequestBody } from "@/src/types/laptop";

export async function uploadLaptopMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const laptop = req.body as LaptopRequestBody;
    const files = req.files as MulterFiles;
    const thumb = files?.["thumb"]?.[0];
    const videos = files?.["videos"]?.[0];
    const gallery = files?.["gallery"];

    if (thumb) {
      const thumbData = await imagekit.uploadImage(thumb, "laptop/thumbnails");
      laptop.thumbId = thumbData.fileId;
      laptop.thumb = thumbData.url;
    }

    if (gallery) {
      const galleryData = await imagekit.bulkUploadImage(
        gallery,
        "laptop/galleries"
      );
      const data = galleryData.map((gal) => {
        return {
          id: gal.fileId,
          image: gal.url,
        };
      });
      laptop.galleries = data;
    }
    if (videos) {
      const videosData = await imagekit.uploadVideos(videos, "laptop/videos");
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
    const prevLaptop = await Laptop.getOneFullDesc(laptopId);
    const files = req.files as MulterFiles;
    const thumbReq = files?.["thumb"];
    const videosReq = files?.["videos"];
    const gallery = files?.["gallery"];
    const laptop = req.body as LaptopRequestBody;

    if (laptop.removeThumbId) {
      if (prevLaptop?.thumbId === laptop.removeThumbId) {
        prevLaptop.thumbId;
        await imagekit.deleteOneFiles(prevLaptop.thumbId);
      }
      laptop.thumb = "";
      laptop.thumbId = "";
    }

    if (laptop.removeVideosId) {
      if (prevLaptop?.videosId === laptop.removeVideosId) {
        await imagekit.deleteOneFiles(prevLaptop.videosId);
      }
      laptop.videos = "";
      laptop.videosId = "";
    }

    if (laptop.removeGalleryIds) {
      await imagekit.bulkDeleteFiles(laptop.removeGalleryIds);
    }

    if (thumbReq) {
      if (prevLaptop?.thumbId) {
        await imagekit.deleteOneFiles(prevLaptop.thumbId as string);
      }
      const thumb = thumbReq[0];
      const uploaded = await imagekit.uploadImage(thumb, "laptop/thumbnails");
      laptop.thumbId = uploaded.fileId;
      laptop.thumb = uploaded.url;
    }

    if (gallery) {
      const galleryData = await imagekit.bulkUploadImage(
        gallery,
        "laptop/galleries"
      );
      const data = galleryData.map((gal) => {
        return {
          id: gal.fileId,
          image: gal.url,
        };
      });
      laptop.galleries = data;
    }

    if (videosReq) {
      if (prevLaptop?.videosId) {
        await imagekit.deleteOneFiles(prevLaptop.videosId);
      }
      const videos = videosReq[0];
      const uploaded = await imagekit.uploadImage(videos, "laptop/videos");
      laptop.videosId = uploaded.fileId;
      laptop.videos = uploaded.url;
    }

    next();
  } catch (err) {
    const error = err as Error;
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

    const headerImage = files?.["headerImage"];
    const screenshots = files?.["screenshots"];
    const movies = files?.["movies"];

    if (headerImage) {
      const uploaded = await imagekit.uploadImage(
        headerImage[0],
        "apps/header-image"
      );
      laptop.headerImageId = uploaded.fileId;
      laptop.headerImage = uploaded.url;
    }

    if (screenshots) {
      const uploaded = await imagekit.uploadImage(
        screenshots[0],
        "apps/screenshots"
      );
      laptop.screenshotsId = uploaded.fileId;
      laptop.screenshots = uploaded.url;
    }

    if (movies) {
      const uploaded = await imagekit.uploadVideos(movies[0], "apps/movies");
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

export async function updateUploadAppMedia(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const prevApp = await applicationService.getOneMediaAttributesApp(
      req.params.id
    );
    const app = req.body as AppRequestBody;
    const files = req.files as MulterFiles;
    const headerImage = files?.["headerImage"];
    const screenshots = files?.["screenshots"];
    const movies = files?.["movies"];

    if (app.removeHeaderImageId) {
      if (app.removeHeaderImageId === prevApp.headerImageId) {
        await imagekit.deleteOneFiles(prevApp.headerImageId);
      }
      app.headerImage = "";
      app.headerImageId = "";
    }
    if (app.removeScreenshotsId) {
      if (app.removeScreenshotsId === prevApp.screenshotsId) {
        await imagekit.deleteOneFiles(prevApp.screenshotsId);
      }
      app.screenshots = "";
      app.screenshotsId = "";
    }
    if (app.removeMoviesId) {
      if (app.removeMoviesId === prevApp.moviesId) {
        await imagekit.deleteOneFiles(prevApp.moviesId);
      }
      app.movies = "";
      app.moviesId = "";
    }

    if (headerImage) {
      if (prevApp.headerImageId) {
        await imagekit.deleteOneFiles(prevApp.headerImageId);
      }
      const uploaded = await imagekit.uploadImage(
        headerImage[0],
        "apps/header-image"
      );
      app.headerImageId = uploaded.fileId;
      app.headerImage = uploaded.url;
    }

    if (screenshots) {
      if (prevApp.screenshotsId) {
        await imagekit.deleteOneFiles(prevApp.screenshotsId);
      }
      const uploaded = await imagekit.uploadImage(
        screenshots[0],
        "apps/screenshots"
      );
      app.screenshotsId = uploaded.fileId;
      app.screenshots = uploaded.url;
    }

    if (movies) {
      if (prevApp.moviesId) {
        await imagekit.deleteOneFiles(prevApp.moviesId);
      }
      const uploaded = await imagekit.uploadVideos(movies[0], "apps/movies");
      app.moviesId = uploaded.fileId;
      app.movies = uploaded.url;
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
