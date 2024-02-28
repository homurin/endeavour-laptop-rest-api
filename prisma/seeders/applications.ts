import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const applicationsBuffer = await readFile(__dirname + "/data/apps.json");
    const applications = JSON.parse(applicationsBuffer.toString());

    await prisma.application.createMany({ data: applications });
    console.info("success seeding applications");
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
}
