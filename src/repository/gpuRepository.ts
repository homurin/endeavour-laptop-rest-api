import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllgpu() {
  const gpus = await prisma.gpu.findMany({
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

  return gpus;
}

export async function getOnegpu(gpuId: string) {
  try {
    const gpu = await prisma.gpu.findFirst({
      select: {
        id: true,
        name: true,
        baseSpeed: true,
        maxSpeed: true,
        cores: true,
        benchmark: true,
        createdAt: true,
        memory: true,
        memorySpeed: true,
        directX: true,
        openGl: true,
        price: true,
      },
      where: {
        id: gpuId,
      },
    });
    return gpu;
  } catch (err) {
    throw err;
  }
}

export async function creategpu(data: Prisma.GpuUncheckedCreateInput) {
  try {
    const gpu = await prisma.gpu.create({
      data,
    });
    return gpu;
  } catch (err) {
    throw err;
  }
}

export async function updategpu(gpuId: string, data: Prisma.GpuUpdateInput) {
  try {
    const gpu = await prisma.gpu.update({
      where: { id: gpuId },
      data,
    });

    return gpu;
  } catch (err) {
    throw err;
  }
}

export async function deletegpu(gpuId: string) {
  try {
    await prisma.laptop.deleteMany({ where: { gpuId } });
    await prisma.gpu.delete({ where: { id: gpuId } });
  } catch (err) {
    throw err;
  }
}
