import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll(
  fields?: Prisma.CpuSelect,
  query?: Prisma.GpuWhereInput
) {
  const gpus = await prisma.gpu.findMany({
    select: fields,
    where: query,
  });

  return gpus;
}

export async function getOne(gpuId: string, fields: Prisma.GpuSelect) {
  try {
    const gpu = await prisma.gpu.findFirst({
      select: fields,
      where: {
        id: gpuId,
      },
    });
    return gpu;
  } catch (err) {
    throw err;
  }
}

export async function count() {
  try {
    const count = await prisma.gpu.count();
    return count;
  } catch (err) {
    throw err;
  }
}
