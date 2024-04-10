import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function count() {
  try {
    const totalCount = await prisma.brand.count();
    return totalCount;
  } catch (err) {
    throw err;
  }
}

export const getAll = async (option?: Prisma.BrandWhereInput) => {
  try {
    const data = await prisma.brand.findMany({ where: option });
    return data;
  } catch (err) {
    throw err;
  }
};
