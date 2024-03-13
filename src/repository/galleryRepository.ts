import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function removeGalleryByLaptopId(laptopId: string) {
  try {
    await prisma.gallery.deleteMany({ where: { laptopId } });
  } catch (err) {
    throw err;
  }
}
