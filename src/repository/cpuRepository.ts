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
      data,
    });
    return cpu;
  } catch (err) {
    throw err;
  }
}

export async function updateCpu(cpuId: string, data: Prisma.CpuUpdateInput) {
  try {
    const cpu = await prisma.cpu.update({
      data: data,
      where: { id: cpuId },
    });

    return cpu;
  } catch (err) {
    throw err;
  }
}

export async function deleteCpu(cpuId: string) {
  try {
    await prisma.laptop.deleteMany({ where: { cpuId } });
    await prisma.cpu.delete({ where: { id: cpuId } });
  } catch (err) {
    throw err;
  }
}
