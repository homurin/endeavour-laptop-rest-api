import * as Laptop from "@repository/laptopRepository";
import { Gallery, Prisma } from "@prisma/client";
import { v4 as uuid } from "uuid";

type GetAllLaptop = Prisma.PromiseReturnType<typeof Laptop.getAll>;
type GetOneLaptop = Prisma.PromiseReturnType<typeof Laptop.getOne>;
type CreateOneLaptop = Prisma.PromiseReturnType<typeof Laptop.createOne>;

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
      adminId: "5d1bee8e-b995-41c5-9fed-e4e537e6a8ab",
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
  galleries: Array<Gallery>
) {
  try {
    const updatedGalleries: Array<Gallery> = galleries.map((gal) => {
      return {
        ...gal,
        updatedAt: new Date(),
      };
    });
    const data: Prisma.LaptopUncheckedUpdateInput = {
      ...laptop,
      adminId: "5d1bee8e-b995-41c5-9fed-e4e537e6a8ab",
      galleries: {
        updateMany: {
          data: updatedGalleries,
          where: {
            laptopId: laptopId,
          },
        },
      },
    };
    const createdLaptop = await Laptop.updateOne(laptopId, data);
    return createdLaptop;
  } catch (err) {
    throw err;
  }
}
