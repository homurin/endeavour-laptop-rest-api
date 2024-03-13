import { Request, Response, NextFunction } from "express";
import { SendError } from "@utils/apiError";
import { Prisma } from "@prisma/client";
import { AppRequestBody } from "../types/application";
import * as applicationService from "@services/applicationService";

export async function getAllApp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const apps = await applicationService.getAllApp();
    res.status(200).json({
      message: "success",
      apps,
    });
  } catch (err) {
    next(new SendError("internal server error", 500));
  }
}

export async function getOneApp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id: string = req.params.id;
    if (!id) {
      return next(new SendError("id cannot be null", 400));
    }
    const app = await applicationService.getOneApp(id);

    res.status(200).json({
      message: "success",
      app,
    });
  } catch (err) {
    const error = err as Error;

    if (error instanceof SendError) {
      return next(new SendError(error.message, error.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}

export async function createOneApp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const app = req.body as AppRequestBody;
    if (req.user) {
      app.adminId = req.user.id;
    }
    const createdapp = await applicationService.createOneApp(app);
    res.status(201).json({
      message: "success",
      app: createdapp,
    });
  } catch (err) {
    const error = err as Error;
    console.info(error.message);
    if (error instanceof SendError) {
      return next(new SendError(error.message, error.statusCode));
    }
    next(new SendError("internal server error", 500));
  }
}

// export async function updateOneapp(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const id: string = req.params.id;

//     let galleries: RequestGallery[] = [];
//     const app = req.body as Prisma.appUncheckedUpdateInput;

//     if (req.user) {
//       app.adminId = req.user.id;
//     }

//     if (req.galleries) {
//       galleries = req.galleries;
//     }

//     const updatedapp = await appService.updateOneapp(
//       id,
//       app,
//       galleries
//     );
//     res.status(201).json({
//       message: "success",
//       app: updatedapp,
//     });
//   } catch (err) {
//     console.info(err);
//     next(new SendError("internal server error", 500));
//   }
// }

// export async function deleteOneapp(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const id: string = req.params.id;
//     await appService.deleteOneapp(id);
//     res.status(200).json({
//       message: `record has been successfull deleted`,
//     });
//   } catch (err) {
//     next(new SendError("internal server error", 500));
//   }
// }
