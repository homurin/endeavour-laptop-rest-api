import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const tagsBuffer = await readFile(__dirname + "/data/tags.json");
    const tags = JSON.parse(tagsBuffer.toString()).map((tag: any) => {
      return {
        id: tag.id,
        adminId: admin.id,
        ...tag,
      };
    });
    await prisma.tag.createMany({ data: tags });
    console.info("success seeding tags");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
