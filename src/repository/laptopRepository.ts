import { Gallery, Laptop, Prisma, PrismaClient } from "@prisma/client";
import { LaptopRequestBody } from "../models/laptop";

const prisma = new PrismaClient();

export async function getAll(
  field: Prisma.LaptopSelect,
  pagination: { skip?: number; take?: number },
  option?: Prisma.LaptopWhereInput,
  orderByOption?: Prisma.LaptopOrderByWithRelationInput
) {
  try {
    const laptops = await prisma.laptop.findMany({
      select: field,
      where: option,
      orderBy: orderByOption,
      skip: pagination.skip,
      take: pagination.take,
    });

    return laptops;
  } catch (err) {
    throw err;
  }
}

export async function count(): Promise<number> {
  const total = await prisma.laptop.count();
  return total;
}

export async function getOneFullDesc(laptopId: string) {
  const laptop = await prisma.laptop.findFirst({
    where: { id: laptopId },
    include: { galleries: true },
  });
  return laptop;
}

export async function getOne(laptopId: string) {
  try {
    const laptop = await prisma.laptop.findFirst({
      select: {
        id: true,
        name: true,
        ram: true,
        hddStorage: true,
        ssdStorage: true,
        price: true,
        isNew: true,
        refreshRate: true,
        displayName: true,
        panelType: true,
        displayResolution: true,
        displaySize: true,
        panelCode: true,
        gamingScore: true,
        workstationScore: true,
        suitableFor: true,
        thumb: true,
        videos: true,
        weight: true,
        createdAt: true,
        brand: {
          select: {
            name: true,
          },
        },
        cpu: {
          select: {
            id: true,
            name: true,
            baseSpeed: true,
            maxSpeed: true,
            cores: true,
          },
        },
        gpu: {
          select: {
            name: true,
            openGl: true,
            directX: true,
            baseSpeed: true,
            maxSpeed: true,
            memory: true,
          },
        },
        windowsVersion: {
          select: {
            name: true,
          },
        },
        galleries: {
          select: {
            image: true,
          },
        },
      },
      where: {
        id: laptopId,
      },
    });

    return laptop;
  } catch (err) {
    throw err;
  }
}

export async function createOne(data: Prisma.LaptopCreateInput) {
  try {
    const createdLaptop = await prisma.laptop.create({
      data,
      include: {
        galleries: {
          select: {
            id: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return createdLaptop;
  } catch (err) {
    throw err;
  }
}

export async function updateOne(
  laptopId: string,
  data: Prisma.LaptopUpdateInput
) {
  try {
    const updatedData: Laptop = await prisma.laptop.update({
      data,
      where: { id: laptopId },
      include: {
        galleries: {
          select: {
            id: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    return updatedData;
  } catch (err) {
    throw err;
  }
}

export async function deleteOne(laptopId: string) {
  try {
    await prisma.gallery.deleteMany({ where: { laptopId: laptopId } });
    await prisma.laptop.delete({ where: { id: laptopId } });
  } catch (err) {
    throw err;
  }
}

export async function bulkCreateGallery(galleries: Gallery[]) {
  try {
    const data = await prisma.gallery.createMany({
      data: galleries,
    });
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteGallery(galleryIds: string[]) {
  try {
    await prisma.gallery.deleteMany({ where: { id: { in: galleryIds } } });
  } catch (err) {
    throw err;
  }
}
