import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const appsTagBuffer = await readFile(__dirname + "/data/apps-tag.json");
    const appsTag = JSON.parse(appsTagBuffer.toString());

    await prisma.tagsOnApplications.createMany({
      data: appsTag,
    });
    console.info("success seeding appsTag");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
