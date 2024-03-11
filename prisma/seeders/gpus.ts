import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const gpusBuffer = await readFile(__dirname + "/data/gpus.json");
    const gpus = JSON.parse(gpusBuffer.toString()).map((app: any) => {
      return {
        id: app.id,
        adminId: admin.id,
        ...app,
      };
    });

    await prisma.gpu.createMany({ data: gpus });
    console.info("success seeding gpus");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}

// main();
