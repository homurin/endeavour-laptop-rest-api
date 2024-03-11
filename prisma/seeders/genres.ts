import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";
const prisma = new PrismaClient();

export default async function main() {
  try {
    const genresBuffer = await readFile(__dirname + "/data/genres.json");
    const genres = JSON.parse(genresBuffer.toString()).map((app: any) => {
      return {
        id: app.id,
        adminId: admin.id,
        ...app,
      };
    });

    await prisma.genre.createMany({ data: genres });
    console.info("success seeding genres");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
