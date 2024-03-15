import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  const cpus = await prisma.windows.findMany({
    select: {
      id: true,
      name: true,
      version: true,
      buildNumber: true,
      releaseDate: true,
    },
  });

  return cpus;
}

export async function getOne(cpuId: string) {
  try {
    const cpu = await prisma.windows.findFirst({
      select: {
        id: true,
        name: true,
        buildNumber: true,
        releaseDate: true,
        version: true,
        createdAt: true,
        updatedAt: true,
        admin: {
          select: {
            fullName: true,
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

export async function createOne(data: Prisma.CpuUncheckedCreateInput) {
  try {
    const cpu = await prisma.cpu.create({
      data,
    });
    return cpu;
  } catch (err) {
    throw err;
  }
}

export async function updateOne(cpuId: string, data: Prisma.CpuUpdateInput) {
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

export async function deleteOne(cpuId: string) {
  try {
    await prisma.laptop.deleteMany({ where: { cpuId } });
    await prisma.cpu.delete({ where: { id: cpuId } });
  } catch (err) {
    throw err;
  }
}
