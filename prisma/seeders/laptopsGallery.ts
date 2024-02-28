import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const galleriesBuffer = await readFile(
      __dirname + "/data/laptops-gallery.json"
    );
    const galleries = JSON.parse(galleriesBuffer.toString());

    await prisma.gallery.createMany({ data: galleries });
    console.info("success seeding galleries");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}

// main();
