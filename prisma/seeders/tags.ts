import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const tagsBuffer = await readFile(__dirname + "/data/tags.json");
    const tags = JSON.parse(tagsBuffer.toString());
    await prisma.tag.createMany({ data: tags });
    console.info("success seeding tags");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
