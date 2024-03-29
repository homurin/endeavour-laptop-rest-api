import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const categoriesBuffer = await readFile(
      __dirname + "/data/categories.json"
    );
    const categories = JSON.parse(categoriesBuffer.toString()).map(
      (ctr: any) => {
        return {
          id: ctr.id,
          adminId: admin.id,
          ...ctr,
        };
      }
    );

    await prisma.category.createMany({ data: categories });
    console.info("success seeding categories");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
