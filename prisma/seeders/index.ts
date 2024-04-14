import { PrismaClient } from "@prisma/client";
import { adminSeed } from "./admin";
import brands from "./brands";
import cpus from "./cpus";
import gpus from "./gpus";
import windows from "./windows";
import laptops from "./laptops";
import laptopGallery from "./laptopsGallery";
import steamGames from "./steamGames";
import categories from "./categories";
import genres from "./genres";
import tags from "./tags";
import appsCategory from "./appsCategory";
import appsGenre from "./appsGenre";
import appsTag from "./appsTag";
import topApps from "./topApps";

const prisma = new PrismaClient();

async function main() {
  try {
    await adminSeed();
    await brands();
    await cpus();
    await gpus();
    await windows();
    await laptops();
    await laptopGallery();
    await topApps();
    await steamGames();
    // await categories();
    // await genres();
    // await tags();
    // await appsCategory();
    // await appsGenre();
    // await appsTag();
  } catch (err) {
    console.info(err);
  } finally {
    console.info("success seeding all data");
    await prisma.$disconnect();
  }
}

main();
