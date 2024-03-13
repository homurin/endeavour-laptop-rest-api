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
    console.info(application);
    return application;
  } catch (err) {
    throw err;
  }
}

export async function deleteOne(appId: string) {
  try {
    await prisma.tagsOnApplications.deleteMany({
      where: { appId },
    });
    await prisma.genresOnApplications.deleteMany({ where: { appId } });
    await prisma.categoriesOnApplications.deleteMany({ where: { appId } });
    await prisma.application.delete({ where: { id: appId } });
  } catch (err) {
    throw err;
  }
}

export async function addGenres(
  data: Array<{ appId: string; genreId: string }>
) {
  try {
    const genres = await prisma.genresOnApplications.createMany({
      data: data,
      skipDuplicates: true,
    });
    return genres;
  } catch (err) {
    throw err;
  }
}

export async function addCategories(
  data: Array<{ appId: string; categoryId: string }>
) {
  try {
    const categories = await prisma.categoriesOnApplications.createMany({
      data: data,
      skipDuplicates: true,
    });
    return categories;
  } catch (err) {
    throw err;
  }
}
export async function addtags(data: Array<{ appId: string; tagId: string }>) {
  try {
    const genres = await prisma.tagsOnApplications.createMany({
      data: data,
      skipDuplicates: true,
    });
    return genres;
  } catch (err) {
    throw err;
  }
}
