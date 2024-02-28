import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const brandsBuffer = await readFile(__dirname + "/data/laptops-brand.json");
    const brands = JSON.parse(brandsBuffer.toString());
    await prisma.brand.createMany({ data: brands });
    console.info("success seeding brands");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
