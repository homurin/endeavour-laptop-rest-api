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
  option?: LaptopGetAllQuery
): Promise<{ data: GetAllLaptop; showedLength: number; count: number }> {
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
    const laptopOrder: Prisma.LaptopOrderByWithRelationInput = {};
    const pagination: { skip?: number; take?: number } = {};

    if (option?.name) {
      console.info(option);
      laptopQuery.name = {
        contains: `${option.name}`,
        mode: "insensitive",
      };
    }
    if (option?.price) {
      laptopQuery.price = {
        gte: Number(option.price),
      };
    }
    if (option?.priceOrder) {
      laptopOrder.price = option.priceOrder as Prisma.SortOrder;
    }

    if (option?.page && option?.show) {
      pagination.take = Number(option.show);
      pagination.skip =
        Number(option.show) * Number(option.page) - Number(option.show);
      console.info("take", pagination.take);
      console.info("skip", pagination.skip);
    }
    const count = await Laptop.count();

    const data: GetAllLaptop = await Laptop.getAll(
      laptopsSelect,
      pagination,
      laptopQuery,
      laptopOrder
    );
    console.info(data.length);
    return {
      data,
      showedLength: data.length,
      count,
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
