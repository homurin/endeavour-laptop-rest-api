/*
  Warnings:

  - The primary key for the `Laptop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `brand` on the `Laptop` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Laptop` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(36)`.
  - You are about to alter the column `weight` on the `Laptop` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal`.
  - A unique constraint covering the columns `[brandId]` on the table `Laptop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpuId]` on the table `Laptop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[gpuId]` on the table `Laptop` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[windowsId]` on the table `Laptop` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Laptop" DROP CONSTRAINT "Laptop_pkey",
DROP COLUMN "brand",
ADD COLUMN     "brandId" VARCHAR(36),
ADD COLUMN     "cpuId" VARCHAR(36),
ADD COLUMN     "gpuId" VARCHAR(36),
ADD COLUMN     "windowsId" VARCHAR(36),
ALTER COLUMN "id" SET DATA TYPE VARCHAR(36),
ALTER COLUMN "url" DROP NOT NULL,
ALTER COLUMN "displaySize" DROP NOT NULL,
ALTER COLUMN "displayResolution" DROP NOT NULL,
ALTER COLUMN "displayName" DROP NOT NULL,
ALTER COLUMN "panelType" DROP NOT NULL,
ALTER COLUMN "panelCode" DROP NOT NULL,
ALTER COLUMN "refreshRate" DROP NOT NULL,
ALTER COLUMN "weight" DROP NOT NULL,
ALTER COLUMN "weight" SET DATA TYPE DECIMAL,
ALTER COLUMN "gamingScore" DROP NOT NULL,
ALTER COLUMN "workstationScore" DROP NOT NULL,
ALTER COLUMN "buyUrl" DROP NOT NULL,
ADD CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Brand" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "benchmark" INTEGER NOT NULL,
    "price" MONEY NOT NULL,
    "cores" INTEGER NOT NULL,
    "directX" DOUBLE PRECISION NOT NULL,
    "openGl" DOUBLE PRECISION NOT NULL,
    "baseSpeed" SMALLINT NOT NULL,
    "maxSpeed" SMALLINT NOT NULL,
    "memory" SMALLINT NOT NULL,
    "memorySpeed" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL,
    "benchmark" INTEGER NOT NULL,
    "baseSpeed" DOUBLE PRECISION NOT NULL,
    "maxSpeed" DOUBLE PRECISION NOT NULL,
    "cores" INTEGER NOT NULL,
    "threads" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Windows" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "version" VARCHAR(10) NOT NULL,
    "buildNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Windows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" VARCHAR(36) NOT NULL,
    "laptopId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "price" MONEY NOT NULL,
    "description" TEXT NOT NULL,
    "website" VARCHAR(255) NOT NULL,
    "developers" VARCHAR(50) NOT NULL,
    "publishers" VARCHAR(50) NOT NULL,
    "screenshots" VARCHAR(255) NOT NULL,
    "windows" BOOLEAN NOT NULL DEFAULT false,
    "mac" BOOLEAN NOT NULL DEFAULT false,
    "linux" BOOLEAN NOT NULL DEFAULT false,
    "releaseDate" VARCHAR(20) NOT NULL,
    "minCpuSpeed" DOUBLE PRECISION NOT NULL,
    "minCores" DOUBLE PRECISION NOT NULL,
    "minThreads" DOUBLE PRECISION NOT NULL,
    "minDirectX" DOUBLE PRECISION NOT NULL,
    "minOpenGl" DOUBLE PRECISION NOT NULL,
    "minGpuMemory" DOUBLE PRECISION NOT NULL,
    "minGpuBoostClock" DOUBLE PRECISION NOT NULL,
    "minRam" DOUBLE PRECISION NOT NULL,
    "minStorage" DOUBLE PRECISION NOT NULL,
    "minOs" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(33) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresOnApplications" (
    "appId" VARCHAR(36) NOT NULL,
    "genreId" VARCHAR(36) NOT NULL,

    CONSTRAINT "GenresOnApplications_pkey" PRIMARY KEY ("appId","genreId")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" VARCHAR(36) NOT NULL,
    "name" VARCHAR(33) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriesOnApplications" (
    "appId" VARCHAR(36) NOT NULL,
    "categoryId" VARCHAR(36) NOT NULL,

    CONSTRAINT "CategoriesOnApplications_pkey" PRIMARY KEY ("appId","categoryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Brand_id_key" ON "Brand"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Gpu_id_key" ON "Gpu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Cpu_id_key" ON "Cpu"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Windows_id_key" ON "Windows"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_id_key" ON "Gallery"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Gallery_laptopId_key" ON "Gallery"("laptopId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_id_key" ON "Application"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_brandId_key" ON "Laptop"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_cpuId_key" ON "Laptop"("cpuId");

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_gpuId_key" ON "Laptop"("gpuId");

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_windowsId_key" ON "Laptop"("windowsId");

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_laptopId_fkey" FOREIGN KEY ("laptopId") REFERENCES "Laptop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Gpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_windowsId_fkey" FOREIGN KEY ("windowsId") REFERENCES "Windows"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnApplications" ADD CONSTRAINT "GenresOnApplications_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnApplications" ADD CONSTRAINT "GenresOnApplications_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnApplications" ADD CONSTRAINT "CategoriesOnApplications_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Application"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnApplications" ADD CONSTRAINT "CategoriesOnApplications_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
