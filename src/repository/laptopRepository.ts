import { Laptop, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  try {
    const laptopsSelect = {
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
    const laptops = await prisma.laptop.findMany({ select: laptopsSelect });

    return laptops;
  } catch (err) {
    throw err;
  }
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

export async function createOne(data: Prisma.LaptopUncheckedCreateInput) {
  try {
    const laptop = await prisma.laptop.create({ data });
    return laptop;
  } catch (err) {
    throw err;
  }
}

export async function updateOne(
  laptopId: string,
  data: Prisma.LaptopUncheckedUpdateInput
) {
  try {
    const laptop: Laptop = await prisma.laptop.update({
      data: data,
      where: { id: laptopId },
    });
    return laptop;
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
