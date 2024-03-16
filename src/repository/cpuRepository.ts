import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll(
  fields?: Prisma.CpuSelect,
  query?: Prisma.CpuWhereInput
) {
  try {
    const cpus = await prisma.cpu.findMany({
      select: fields,
      where: query,
    });

    return cpus;
  } catch (err) {
    throw err;
  }
}

export async function count() {
  try {
    const count = await prisma.cpu.count();
    return count;
  } catch (err) {
    throw err;
  }
}

export async function getOne(cpuId: string, fields?: Prisma.CpuSelect) {
  try {
    const cpu = await prisma.cpu.findFirst({
      select: fields,
      where: {
        id: cpuId,
      },
    });

    return cpu;
  } catch (err) {
    throw err;
  }
}
