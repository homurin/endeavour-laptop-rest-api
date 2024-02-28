import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const genresBuffer = await readFile(__dirname + "/data/genres.json");
    const genres = JSON.parse(genresBuffer.toString());
    await prisma.genre.createMany({ data: genres });
    console.info("success seeding genres");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
