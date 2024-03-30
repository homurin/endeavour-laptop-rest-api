import { v4 as uuid } from "uuid";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as Application from "@repository/applicationRepository";
import { SendError } from "@utils/apiError";
import { AppGetAllQuery, AppRequestBody } from "@/src/types/application";
import {
  GetAllApp,
  CreatedOneApp,
  UpdatedOneApp,
} from "@/src/types/application";

export async function getRandomApps() {
  try {
    const randomApps = await Application.getRandom();
    return randomApps;
  } catch (err) {
    throw err;
  }
}

export async function getAllApp(options: AppGetAllQuery): Promise<{
  data: GetAllApp;
  dataCount: number;
  totalCount: number;
}> {
  try {
    const pagination: { skip?: number; take?: number } = { skip: 0, take: 30 };
    const appOption: Prisma.ApplicationWhereInput = {};
    const orderBy: Prisma.ApplicationOrderByWithRelationInput = {};

    const totalCount = await Application.count();

    const fields: Prisma.ApplicationSelect = {
      id: true,
      name: true,
      headerImage: true,
      price: true,
      linux: true,
      mac: true,
      windows: true,
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    };

    if (options.search) {
      appOption.name = {
        contains: options.search,
        mode: "insensitive",
      };
    }

    if (options.sort_by === "created_at" && options.order_by) {
      orderBy.createdAt = options.order_by;
    }

    if (options.page && options.size) {
      pagination.take = Number(options.size);
      pagination.skip = (Number(options.page) - 1) * Number(options.size);
    }

    const data = await Application.getAll(fields, pagination, appOption);

    return {
      data,
      dataCount: data.length,
      totalCount,
    };
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}

export async function getOneMediaAttributesApp(appId: string) {
  try {
    const data = await Application.getOneMediaAttributes(appId);
    if (!data) {
      throw new SendError("application not found", 404);
    }
    return data;
  } catch (err) {
    throw err;
  }
}

export async function getOneApp(id: string) {
  const fields: Prisma.ApplicationSelect = {
    id: true,
    name: true,
    price: true,
    minCpuSpeed: true,
    minCores: true,
    minGpuBoostClock: true,
    minGpuMemory: true,
    minDirectX: true,
    minOpenGl: true,
    minRam: true,
    minStorage: true,
    link: true,
    headerImage: true,
    screenshots: true,
    movies: true,
    description: true,
    developers: true,
    publishers: true,
    linux: true,
    mac: true,
    windows: true,
    releaseDate: true,
    website: true,
    minOs: {
      select: {
        id: true,
        name: true,
      },
    },
    categories: {
      select: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    genres: {
      select: {
        genre: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
    tags: {
      select: {
        tag: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  };
  const data = await Application.getOne(id, fields);
  if (!data) {
    throw new SendError("application not found", 404);
  }
  return data;
}

export async function isExists(id: string) {
  const data = await Application.getOne(id);
  if (!data) {
    return false;
  }
  return true;
}

export async function createOneApp(
  app: AppRequestBody
): Promise<CreatedOneApp> {
  try {
    const appId = uuid();

    const data: Prisma.ApplicationCreateInput = {
      id: appId,
      admin: {
        connect: {
          id: app.adminId,
        },
      },
      minOs: {
        connect: {
          id: app.windId,
        },
      },
      headerImageId: app.headerImageId,
      moviesId: app.moviesId,
      screenshotsId: app.screenshotsId,
      name: app.name,
      description: app.description,
      minCpuSpeed: Number(app.minCpuSpeed),
      minCores: Number(app.minCores),
      minGpuBoostClock: Number(app.minGpuBoostClock),
      minGpuMemory: Number(app.minGpuMemory),
      minDirectX: Number(app.minDirectX),
      minOpenGl: Number(app.minOpenGl),
      minRam: Number(app.minRam),
      minStorage: Number(app.minStorage),
      bitOs: Number(app.bitOs),
      price: Number(app?.price) || 0,
      headerImage: app.headerImage,
      movies: app.movies,
      screenshots: app.screenshots,
      link: app.link,
      website: app.website,
      developers: app.developers,
      publishers: app.publishers,
      releaseDate: app.releaseDate,
      windows: JSON.parse(String(app.windows)),
      linux: JSON.parse(String(app.linux)),
      mac: JSON.parse(String(app.mac)),
    };

    const createdApp: CreatedOneApp = await Application.createOne(data);

    if (!createdApp) {
      throw new SendError("failed create application", 500);
    }
    return createdApp;
  } catch (err) {
    const error = err as Error;
    throw new SendError(error.message, 500);
  }
}
export async function updateOneApp(
  appId: string,
  app: AppRequestBody
): Promise<UpdatedOneApp> {
  try {
    const data: Prisma.ApplicationUpdateInput = {
      admin: {
        connect: {
          id: app.adminId,
        },
      },
      minOs: {
        connect: {
          id: app.windId,
        },
      },
      headerImageId: app.headerImageId,
      moviesId: app.moviesId,
      screenshotsId: app.screenshotsId,
      name: app.name,
      description: app.description,
      minCpuSpeed: Number(app.minCpuSpeed),
      minCores: Number(app.minCores),
      minGpuBoostClock: Number(app.minGpuBoostClock),
      minGpuMemory: Number(app.minGpuMemory),
      minDirectX: Number(app.minDirectX),
      minOpenGl: Number(app.minOpenGl),
      minRam: Number(app.minRam),
      minStorage: Number(app.minStorage),
      bitOs: Number(app.bitOs),
      price: Number(app?.price) || 0,
      headerImage: app.headerImage,
      movies: app.movies,
      screenshots: app.screenshots,
      link: app.link,
      website: app.website,
      developers: app.developers,
      publishers: app.publishers,
      releaseDate: app.releaseDate,
      windows: JSON.parse(String(app.windows)),
      linux: JSON.parse(String(app.linux)),
      mac: JSON.parse(String(app.mac)),
    };

    const updatedApp: UpdatedOneApp = await Application.updateOne(appId, data);

    return updatedApp;
  } catch (err) {
    const error = err as Error;
    if (error instanceof PrismaClientKnownRequestError) {
      throw new SendError(`${error.message}`, 400);
    }
    throw new SendError(error.message, 500);
  }
}

export async function deleteOneApp(appId: string): Promise<void> {
  try {
    await Application.deleteOne(appId);
  } catch (err) {
    throw err;
  }
}
