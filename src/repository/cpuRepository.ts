import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllCpu() {
  const cpus = await prisma.cpu.findMany({
    select: {
      id: true,
      name: true,
      baseSpeed: true,
      maxSpeed: true,
      cores: true,
      price: true,
      benchmark: true,
    },
  });

  return cpus;
}

export async function getOnecpu(cpuId: string) {
  try {
    const cpu = await prisma.cpu.findFirst({
      select: {
        id: true,
        name: true,
        price: true,
        baseSpeed: true,
        maxSpeed: true,
        cores: true,
        threads: true,
        benchmark: true,
        createdAt: true,
        laptops: {
          select: {
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
          },
        },
      },
      where: {
        id: cpuId,
      },
    });

    return cpu;
  } catch (err) {
    throw err;
  }
}

export async function createCpu(data: Prisma.CpuUncheckedCreateInput) {
  try {
    const cpu = await prisma.cpu.create({
      data: {
        ...data,
      },
    });
    return cpu;
  } catch (err) {
    throw err;
  }
}

export async function updateCpu(cpuId: string, data: Prisma.CpuUpdateInput) {
  try {
    const cpu = await prisma.cpu.update({
      where: { id: cpuId },
      data: data,
    });

    return cpu;
  } catch (err) {
    throw err;
  }
}

export async function deleteCpu(cpuId: string) {
  try {
    await prisma.cpu.delete({ where: { id: cpuId } });
  } catch (err) {
    throw err;
  }
}
