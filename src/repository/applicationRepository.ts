import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function count(): Promise<number> {
  const count = await prisma.application.count();
  return count;
}

export async function getRandom() {
  try {
    const appCount = await prisma.application.count();
    const randomIndex = Math.floor(Math.random() * appCount);
    const randomApps = await prisma.application.findMany({
      take: 10,
      skip: randomIndex,
      select: {
        id: true,
        name: true,
        headerImage: true,
        screenshots: true,
        movies: true,
        windows: true,
        linux: true,
        mac: true,
        price: true,
        description: true,
      },
    });
    return randomApps;
  } catch (err) {
    throw err;
  }
}

export async function getAll(
  fields: Prisma.ApplicationSelect,
  pagination: { skip?: number; take?: number },
  option?: Prisma.ApplicationWhereInput,
  orderBy?: Prisma.ApplicationOrderByWithRelationInput
) {
  const applications = await prisma.application.findMany({
    select: fields,
    where: option,
    skip: pagination.skip,
    take: pagination.take,
    orderBy,
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

export async function getOne(
  applicationId: string,
  fields?: Prisma.ApplicationSelect
) {
  try {
    const application = await prisma.application.findFirst({
      select: fields,
      where: {
        id: applicationId,
      },
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function createOne(data: Prisma.ApplicationCreateInput) {
  try {
    const application = await prisma.application.create({
      data,
      include: {
        admin: true,
        minOs: true,
      },
    });
    return application;
  } catch (err) {
    throw err;
  }
}

export async function updateOne(
  applicationId: string,
  data: Prisma.ApplicationUpdateInput
) {
  try {
    const application = await prisma.application.update({
      where: { id: applicationId },
      data,
      include: {
        admin: true,
        minOs: true,
      },
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
