import { v4 as uuid } from "uuid";
import { Prisma } from "@prisma/client";
import * as Application from "@repository/applicationRepository";
import { SendError } from "../utils/apiError";
import { AppRequestBody } from "../types/application";

type CreateOneApp = Prisma.PromiseReturnType<typeof Application.createOne>;
type CreatedGenres = Prisma.PromiseReturnType<typeof Application.addGenres>;
type CreatedCategories = Prisma.PromiseReturnType<
  typeof Application.addCategories
>;
type CreatedTags = Prisma.PromiseReturnType<typeof Application.addtags>;

interface CreatedAppFullDesc extends CreateOneApp {
  genres?: CreatedGenres;
  categories?: CreatedCategories;
  tags?: CreatedTags;
}

export async function getAllApp() {
  try {
    const data = await Application.getAll();
    return data;
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}

export async function getOneApp(id: string) {
  try {
    const data = await Application.getOne(id);
    if (!data) {
      throw new SendError("application not found", 404);
    }
    return data;
  } catch (err) {
    const error = err as Error;

    throw new SendError(error.message, 500);
  }
}

export async function createOneApp(
  app: AppRequestBody
): Promise<CreatedAppFullDesc> {
  try {
    const appId = uuid();
    const genres = app.genresId?.map((genreId) => {
      return {
        appId,
        genreId,
      };
    });
    const tags = app.tagsId?.map((tagId) => {
      return {
        appId,
        tagId,
      };
    });
    const categories = app.categoriesId?.map((categoryId) => {
      return {
        appId,
        categoryId,
      };
    });

    delete app.genresId;
    delete app.tagsId;
    delete app.categoriesId;

    const data: Prisma.ApplicationUncheckedCreateInput = {
      ...app,
      id: appId,
      price: Number(app?.price) || 0,
      windows: JSON.parse(String(app.windows)),
      linux: JSON.parse(String(app.linux)),
      mac: JSON.parse(String(app.mac)),
      minCpuSpeed: Number(app.minCpuSpeed),
      minCores: Number(app.minCores),
      minGpuBoostClock: Number(app.minGpuBoostClock),
      minGpuMemory: Number(app.minGpuMemory),
      minDirectX: Number(app.minDirectX),
      minOpenGl: Number(app.minOpenGl),
      minRam: Number(app.minRam),
      minStorage: Number(app.minStorage),
      bitOs: Number(app.bitOs),
    };

    const createdApp: CreatedAppFullDesc = await Application.createOne(data);

    if (genres) {
      createdApp.genres = await Application.addGenres(genres);
    }
    if (categories) {
      createdApp.categories = await Application.addCategories(categories);
    }
    if (tags) {
      createdApp.tags = await Application.addtags(tags);
    }

    if (!createdApp) {
      throw new SendError("failed create application", 500);
    }
    return createdApp;
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}

// export async function updateOneLaptop(
//   appId: string,
//   laptop: Prisma.LaptopUncheckedUpdateInput,
//   galleries?: Array<{ id?: string; image?: string }>
// ): Promise<UpdateOneLaptop> {
//   try {
//     const gallery = galleries as Prisma.GalleryCreateManyLaptopsInput[];
//     const data: Prisma.LaptopUncheckedUpdateInput = {
//       ...laptop,
//       ram: Number(laptop.ram),
//       hddStorage: Number(laptop.hddStorage),
//       ssdStorage: Number(laptop.hddStorage),
//       displaySize: Number(laptop.displaySize),
//       price: Number(laptop.price),
//       weight: Number(laptop.weight),
//       panelCode: Number(laptop.panelCode),
//       refreshRate: Number(laptop.refreshRate),
//       workstationScore: Number(laptop.workstationScore),
//       gamingScore: Number(laptop.gamingScore),
//       isNew: Boolean(JSON.parse(String(laptop.isNew))),
//       galleries: {
//         createMany: {
//           data: gallery,
//         },
//       },
//     };

//     const updatedLaptop = await Laptop.updateOne(appId, data);

//     return updatedLaptop;
//   } catch (err) {
//     throw err;
//   }
// }

// export async function deleteOneLaptop(appId: string): Promise<void> {
//   try {
//     await await Laptop.deleteOne(appId);
//   } catch (err) {
//     throw err;
//   }
// }
