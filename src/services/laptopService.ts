import * as Laptop from "@repository/laptopRepository";
import { Prisma, $Enums } from "@prisma/client";
import {
  GetAllLaptop,
  GetOneLaptop,
  UpdateOneLaptop,
  CreateOneLaptop,
} from "../models/laptop";
import { v4 as uuid } from "uuid";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import { SendError } from "../utils/apiError";
import { LaptopRequestBody, LaptopGetAllQuery } from "@models/laptop";

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
      cpu: {
        select: {
          name: true,
          baseSpeed: true,
        },
      },
      gpu: {
        select: {
          name: true,
        },
      },
    };
    const laptopQuery: Prisma.LaptopWhereInput = {};
    const pagination: { skip?: number; take?: number } = {};
    const totalCount = await Laptop.count();

    if (options?.name) {
      console.info(options);
      laptopQuery.name = {
        contains: options.name,
        mode: "insensitive",
      };
    }

    if (options?.page && options?.size) {
      pagination.take = Number(options.size);
      pagination.skip = (Number(options.page) - 1) * Number(options.size);
    }

    const data: GetAllLaptop = await Laptop.getAll(
      laptopsSelect,
      pagination,
      laptopQuery
    );

    return {
      data,
      dataCount: data.length,
      totalCount,
    };
  } catch (err) {
    console.info(err);
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
