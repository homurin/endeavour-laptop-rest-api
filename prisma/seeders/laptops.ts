import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const laptopsBuffer = await readFile(__dirname + "/data/laptops.json");
    const laptops = JSON.parse(laptopsBuffer.toString()).map((lap: any) => {
      return {
        ...lap,
        id: lap.id,
        adminId: admin.id,
        price: Number(lap.price * 15870.35),
      };
    });

    await prisma.laptop.createMany({ data: laptops });
    console.info("laptops seeding success");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
