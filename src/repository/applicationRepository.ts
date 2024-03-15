import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAll() {
  const applications = await prisma.application.findMany({
    select: {
      id: true,
      name: true,
      headerImage: true,
      price: true,
      linux: true,
      mac: true,
      windows: true,
    },
  });

  return applications;
}

export async function getOneMediaAttributes(id: string) {
  try {
    const application = await prisma.application.findFirst({
      select: {
        headerImageId: true,
        headerImage: true,
        screenshotsId: true,
        screenshots: true,
        moviesId: true,
        movies: true,
      },
      where: { id },
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function getOne(applicationId: string) {
  try {
    const application = await prisma.application.findFirst({
      select: {
        id: true,
        name: true,
        price: true,
        minCpuSpeed: true,
        minCores: true,
        minGpuBoostClock: true,
        minGpuMemory: true,
        minDirectX: true,
        minOpenGl: true,
        minRam: true,
        minStorage: true,
        link: true,
        headerImage: true,
        screenshots: true,
        movies: true,
        description: true,
        developers: true,
        publishers: true,
        linux: true,
        mac: true,
        windows: true,
        releaseDate: true,
        website: true,
        minOs: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        genres: {
          select: {
            genre: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where: {
        id: applicationId,
      },
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function createOne(data: Prisma.ApplicationUncheckedCreateInput) {
  try {
    const application = await prisma.application.create({
      data,
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function updateOne(
  applicationId: string,
  data: Prisma.ApplicationUncheckedUpdateInput
) {
  try {
    const application = await prisma.application.update({
      where: { id: applicationId },
      data,
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function deleteOne(appId: string) {
  try {
    await prisma.application.delete({ where: { id: appId } });
  } catch (err) {
    throw err;
  }
}
