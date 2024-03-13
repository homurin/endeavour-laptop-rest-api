import * as Laptop from "@repository/laptopRepository";
import { Prisma } from "@prisma/client";
import {
  GetAllLaptop,
  GetOneLaptop,
  UpdateOneLaptop,
  CreateOneLaptop,
} from "../types/laptop";
import { v4 as uuid } from "uuid";

export async function getAllLaptop(): Promise<GetAllLaptop> {
  try {
    const data: GetAllLaptop = await Laptop.getAll();
    return data;
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
  laptop: Prisma.LaptopUncheckedCreateInput,
  galleries: Array<{ id?: string; image?: string }>
): Promise<CreateOneLaptop> {
  try {
    const gallery = galleries as Prisma.GalleryCreateManyLaptopsInput[];

    const data: Prisma.LaptopUncheckedCreateInput = {
      ...laptop,
      id: uuid(),
      ram: Number(laptop.ram),
      hddStorage: Number(laptop.hddStorage),
      ssdStorage: Number(laptop.hddStorage),
      displaySize: Number(laptop.displaySize),
      price: Number(laptop.price),
      weight: Number(laptop.weight),
      panelCode: Number(laptop.panelCode),
      refreshRate: Number(laptop.refreshRate),
      workstationScore: Number(laptop.workstationScore),
      gamingScore: Number(laptop.gamingScore),
      isNew: Boolean(JSON.parse(String(laptop.isNew))),
      galleries: {
        createMany: {
          data: gallery,
        },
      },
    };
    const createdLaptop = await Laptop.createOne(data);
    return createdLaptop;
  } catch (err) {
    throw err;
  }
}

export async function updateOneLaptop(
  laptopId: string,
  laptop: Prisma.LaptopUncheckedUpdateInput,
  galleries?: Array<{ id?: string; image?: string }>
): Promise<UpdateOneLaptop> {
  try {
    const gallery = galleries as Prisma.GalleryCreateManyLaptopsInput[];
    const data: Prisma.LaptopUncheckedUpdateInput = {
      ...laptop,
      ram: Number(laptop.ram),
      hddStorage: Number(laptop.hddStorage),
      ssdStorage: Number(laptop.hddStorage),
      displaySize: Number(laptop.displaySize),
      price: Number(laptop.price),
      weight: Number(laptop.weight),
      panelCode: Number(laptop.panelCode),
      refreshRate: Number(laptop.refreshRate),
      workstationScore: Number(laptop.workstationScore),
      gamingScore: Number(laptop.gamingScore),
      isNew: Boolean(JSON.parse(String(laptop.isNew))),
      galleries: {
        createMany: {
          data: gallery,
        },
      },
    };

    const updatedLaptop = await Laptop.updateOne(laptopId, data);

    return updatedLaptop;
  } catch (err) {
    throw err;
  }
}

export async function deleteOneLaptop(laptopId: string): Promise<void> {
  try {
    await await Laptop.deleteOne(laptopId);
  } catch (err) {
    throw err;
  }
}
