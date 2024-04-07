import * as Laptop from "@repository/laptopRepository";
import { Prisma, $Enums } from "@prisma/client";
import {
  GetAllLaptop,
  GetOneLaptop,
  UpdateOneLaptop,
  CreateOneLaptop,
} from "../types/laptop";
import { v4 as uuid } from "uuid";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { SendError } from "../utils/apiError";
import { LaptopRequestBody, LaptopGetAllQuery } from "@/src/types/laptop";

export async function getRandomLaptop() {
  try {
    const randomLaptops = await Laptop.getRandom();
    return randomLaptops;
  } catch (err) {
    throw err;
  }
}

export async function getAllLaptop(
  options?: LaptopGetAllQuery
): Promise<{ data: GetAllLaptop; dataCount: number; totalCount: number }> {
  try {
    const laptopsSelect: Prisma.LaptopSelect = {
      id: true,
      name: true,
      ram: true,
      displayResolution: true,
      panelType: true,
      hddStorage: true,
      ssdStorage: true,
      price: true,
      thumb: true,
      osEdition: true,
      cpu: {
        select: {
          name: true,
          baseSpeed: true,
          maxSpeed: true,
        },
      },
      gpu: {
        select: {
          name: true,
          maxSpeed: true,
        },
      },
      windowsVersion: {
        select: {
          name: true,
        },
      },
    };
    const laptopQuery: Prisma.LaptopWhereInput = {};
    const pagination: { skip?: number; take?: number } = { skip: 0, take: 30 };
    const orderBy: Prisma.LaptopOrderByWithRelationInput = {};
    const totalCount = await Laptop.count();

    if (options?.search) {
      laptopQuery.name = {
        contains: options.search,
        mode: "insensitive",
      };
    }

    if (options?.sort_by === "ram" && options.order_by) {
      orderBy.ram = options.order_by;
    }

    if (options?.sort_by === "price" && options.order_by) {
      orderBy.price = options.order_by;
    }

    if (options?.sort_by === "cpu_speed" && options.order_by) {
      orderBy.cpu = { maxSpeed: options.order_by };
    }

    if (options?.sort_by === "gpu_speed" && options.order_by) {
      orderBy.gpu = { maxSpeed: options.order_by };
    }

    if (options?.sort_by === "ssd_storage" && options.order_by) {
      orderBy.ssdStorage = options.order_by;
    }
    if (options?.sort_by === "created_at" && options.order_by) {
      orderBy.createdAt = options.order_by;
    }

    if (options?.page && options?.size) {
      pagination.take = Number(options.size);
      pagination.skip = (Number(options.page) - 1) * Number(options.size);
    }

    const data: GetAllLaptop = await Laptop.getAll(
      laptopsSelect,
      pagination,
      laptopQuery,
      orderBy
    );

    return {
      data,
      dataCount: data.length,
      totalCount,
    };
  } catch (err) {
    throw err;
  }
}

export async function getOneLaptop(id: string): Promise<GetOneLaptop> {
  try {
    const data: GetOneLaptop = await Laptop.getOne(id);
    return data;
  } catch (err) {
    throw err;
  }
}

export async function createOneLaptop(
  data: LaptopRequestBody
): Promise<CreateOneLaptop> {
  try {
    const laptop: Prisma.LaptopCreateInput = {
      id: uuid(),
      admin: {
        connect: {
          id: data.adminId,
        },
      },
      cpu: {
        connect: {
          id: data.cpuId,
        },
      },
      gpu: {
        connect: {
          id: data.gpuId,
        },
      },
      windowsVersion: {
        connect: {
          id: data.winId,
        },
      },
      brand: {
        connect: {
          id: data.brandId,
        },
      },
      thumbId: data.thumbId,
      videosId: data.videosId,
      thumb: data.thumb,
      videos: data.videos,
      name: data.name,
      hddStorage: Number(data.hddStorage),
      ssdStorage: Number(data.ssdStorage),
      ram: Number(data.ram),
      displayName: data.displayName,
      displayResolution: data.displayResolution,
      displaySize: Number(data.displaySize),
      gamingScore: Number(),
      workstationScore: Number(),
      refreshRate: Number(data.refreshRate),
      isNew: JSON.parse(String(data.isNew)) || true,
      suitableFor: data.suitableFor as $Enums.LaptopSuit,
      osEdition: data.osEdition as $Enums.WindowsEdition,
      price: Number(data.price),
      panelCode: Number(data.panelCode),
      weight: Number(data.weight),
      panelType: data.panelType as $Enums.PanelType,
    };
    if (data.galleries) {
      laptop.galleries = {
        createMany: {
          data: data.galleries,
        },
      };
    }
    const createdLaptop = await Laptop.createOne(laptop);
    return createdLaptop;
  } catch (err) {
    throw err;
  }
}

export async function updateOneLaptop(
  laptopId: string,
  data: LaptopRequestBody
): Promise<UpdateOneLaptop> {
  try {
    const laptop: Prisma.LaptopUpdateInput = {
      admin: {
        connect: {
          id: data.adminId,
        },
      },
      cpu: {
        connect: {
          id: data.cpuId,
        },
      },
      gpu: {
        connect: {
          id: data.gpuId,
        },
      },
      windowsVersion: {
        connect: {
          id: data.winId,
        },
      },
      brand: {
        connect: {
          id: data.brandId,
        },
      },
      thumbId: data.thumbId,
      videosId: data.videosId,
      thumb: data.thumb,
      videos: data.videos,
      name: data.name,
      hddStorage: Number(data.hddStorage),
      ssdStorage: Number(data.ssdStorage),
      ram: Number(data.ram),
      displayName: data.displayName,
      displayResolution: data.displayResolution,
      displaySize: Number(data.displaySize),
      gamingScore: Number(),
      workstationScore: Number(),
      refreshRate: Number(data.refreshRate),
      isNew: JSON.parse(String(data.isNew)) || true,
      suitableFor: data.suitableFor as $Enums.LaptopSuit,
      osEdition: data.osEdition as $Enums.WindowsEdition,
      price: Number(data.price),
      panelCode: Number(data.panelCode),
      weight: Number(data.weight),
      panelType: data.panelType as $Enums.PanelType,
    };
    if (data.galleries) {
      laptop.galleries = {
        createMany: {
          data: data.galleries,
        },
      };
    }
    if (data.deleteGalleries) {
      laptop.galleries = {
        deleteMany: {
          id: {
            in: data.deleteGalleries,
          },
        },
      };
    }
    const updatedLaptop = await Laptop.updateOne(laptopId, laptop);

    return updatedLaptop;
  } catch (err) {
    const error = err as Error;
    if (error instanceof PrismaClientValidationError) {
      throw new SendError(`${error.message}`, 400);
    }
    throw err;
  }
}

export async function deleteOneLaptop(laptopId: string): Promise<void> {
  try {
    await Laptop.deleteOne(laptopId);
  } catch (err) {
    throw err;
  }
}
