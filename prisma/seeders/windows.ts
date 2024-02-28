import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const windowsBuffer = await readFile(__dirname + "/data/windows.json");
    const windows = JSON.parse(windowsBuffer.toString());

    await prisma.windows.createMany({ data: windows });
    console.info("success seeding windows");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
