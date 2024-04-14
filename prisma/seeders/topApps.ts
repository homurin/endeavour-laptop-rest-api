import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const topAppsBuffer = await readFile(__dirname + "/data/top-apps.json");
    const topApps = JSON.parse(topAppsBuffer.toString()).map((app: any) => {
      delete app.bitOs;
      return {
        ...app,
        id: uuid(),
        winId: app.winId.trim(),
        adminId: admin.id,
        price: Number(app.price * 15870.35),
        releaseDate: new Date(app.releaseDate),
      };
    });

    await prisma.application.createMany({ data: topApps });
    console.info("top apps seeding success");
  } catch (err) {
    console.error(err);
    throw new Error("top apps seeding failed");
  }
}
