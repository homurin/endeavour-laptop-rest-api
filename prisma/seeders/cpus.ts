import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const cpusBuffer = await readFile(__dirname + "/data/cpus.json");
    const cpus = JSON.parse(cpusBuffer.toString());

    await prisma.cpu.createMany({ data: cpus });
    console.info("success seeding cpus");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}

// main();
