import { PrismaClient } from "@prisma/client";
import brands from "./brands";
import cpus from "./cpus";
import gpus from "./gpus";
import windows from "./windows";
import laptops from "./laptops";
import laptopGallery from "./laptopsGallery";
import applications from "./applications";
import categories from "./categories";
import genres from "./genres";
import tags from "./tags";
import appsCategory from "./appsCategory";
import appsGenre from "./appsGenre";
import appsTag from "./appsTag";

const prisma = new PrismaClient();

async function main() {
  try {
    await brands();
    await cpus();
    await gpus();
    await windows();
    await laptops();
    await laptopGallery();
    await applications();
    await categories();
    await genres();
    await tags();
    await appsCategory();
    await appsGenre();
    await appsTag();
  } catch (err) {
    console.info(err);
  } finally {
    console.info("success seeding all data");
    await prisma.$disconnect();
  }
}

main();
