import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllApplication() {
  const applications = await prisma.application.findMany({
    select: {
      id: true,
      name: true,
      headerImage: true,
      price: true,
      linux: true,
      mac: true,
      windows: true,
      categories: {
        select: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return applications;
}

export async function getOneApplication(applicationId: string) {
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
            name: true,
          },
        },
        tags: {
          select: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
        genres: {
          select: {
            genre: {
              select: {
                name: true,
              },
            },
          },
        },
        categories: {
          select: {
            category: {
              select: {
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
    console.info(application);
    return application;
  } catch (err) {
    throw err;
  }
}

export async function createApplication(
  data: Prisma.ApplicationUncheckedCreateInput
) {
  try {
    const application = await prisma.application.create({
      data: {
        ...data,
      },
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function updateApplication(
  applicationId: string,
  data: Prisma.ApplicationUpdateInput
) {
  try {
    const application = await prisma.application.update({
      where: { id: applicationId },
      data: data,
    });
    console.info(application);
    return application;
  } catch (err) {
    throw err;
  }
}

export async function deleteApplication(applicationId: string) {
  try {
    await prisma.application.delete({ where: { id: applicationId } });
  } catch (err) {
    throw err;
  }
}
