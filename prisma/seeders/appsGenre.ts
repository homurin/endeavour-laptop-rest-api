import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const appsGenreBuffer = await readFile(__dirname + "/data/apps-genre.json");
    const appsGenre = JSON.parse(appsGenreBuffer.toString());

    await prisma.genresOnApplications.createMany({
      data: appsGenre,
    });
    console.info("success seeding appsGenre");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
