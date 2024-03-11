import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const laptopsBuffer = await readFile(__dirname + "/data/laptops.json");
    const laptops = JSON.parse(laptopsBuffer.toString()).map((lap: any) => {
      return {
        id: lap.id,
        adminId: admin.id,
        ...lap,
      };
    });

    await prisma.laptop.createMany({ data: laptops });
    console.info("success seeding laptops");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
