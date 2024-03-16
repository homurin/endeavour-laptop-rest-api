import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll(
  fields?: Prisma.WindowsSelect,
  query?: Prisma.WindowsWhereInput
) {
  try {
    const windows = await prisma.windows.findMany({
      select: fields,
      where: query,
    });

    return windows;
  } catch (err) {
    throw err;
  }
}

export async function getOne(windowsId: string, fields?: Prisma.WindowsSelect) {
  try {
    const windows = await prisma.windows.findFirst({
      select: fields,
      where: {
        id: windowsId,
      },
    });

    return windows;
  } catch (err) {
    throw err;
  }
}

export async function count(): Promise<number> {
  try {
    const count = await prisma.windows.count();
    return count;
  } catch (err) {
    throw err;
  }
}
