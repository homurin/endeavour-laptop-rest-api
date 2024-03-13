import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProfileById(id: string) {
  try {
    const admin = await prisma.admin.findFirst({
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      where: { id },
    });
    return admin;
  } catch (err) {
    throw err;
  }
}

export async function getAuthProfileByUsername(username: string) {
  try {
    const admin = await prisma.admin.findFirst({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
      where: {
        username,
      },
    });
    return admin;
  } catch (err) {
    throw err;
  }
}

export async function isAdminExists(adminId: string): Promise<boolean> {
  try {
    const isExists = await prisma.admin.findFirst({ where: { id: adminId } });
    if (isExists) {
      return true;
    }
    return false;
  } catch (err) {
    throw err;
  }
}
