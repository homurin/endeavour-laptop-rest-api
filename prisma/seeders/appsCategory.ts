import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const appsCategoryBuffer = await readFile(
      __dirname + "/data/apps-category.json"
    );
    const appsCategory = JSON.parse(appsCategoryBuffer.toString());

    await prisma.categoriesOnApplications.createMany({
      data: appsCategory,
    });
    console.info("success seeding appsCategory");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
