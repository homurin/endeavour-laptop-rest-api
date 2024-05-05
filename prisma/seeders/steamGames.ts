import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";
import { admin } from "./admin";

const prisma = new PrismaClient();

export default async function main() {
  try {
    const steamGamesBuffer = await readFile(
      __dirname + "/data/steam-games.json"
    );
    const steamGames = JSON.parse(steamGamesBuffer.toString()).map(
      (app: any) => {
        delete app.minThreads;
        delete app.bitOs;
        return {
          ...app,
          id: app.id,
          adminId: admin.id,
          price: Number(app.price * 15870.35),
          minGpuMemory: app.minGpuMemory / 1000,
        };
      }
    );

    await prisma.application.createMany({ data: steamGames });
    console.info("steam games seeding success");
  } catch (err) {
    console.error(err);
    throw new Error("steam games seeding failed");
  }
}
