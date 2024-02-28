-- CreateEnum
CREATE TYPE "PanelType" AS ENUM ('CRT', 'LCD', 'LED', 'TN', 'IPS', 'VA', 'OLED', 'AMOLED');

-- CreateEnum
CREATE TYPE "LaptopSuit" AS ENUM ('GAMING', 'DESIGN', 'PRODUCTIVITY');

-- CreateTable
CREATE TABLE "Laptop" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "thumb" VARCHAR(255) NOT NULL,
    "price" MONEY NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "displaySize" SMALLINT NOT NULL,
    "displayResolution" VARCHAR(50) NOT NULL,
    "displayName" VARCHAR(50) NOT NULL,
    "panelType" "PanelType" NOT NULL,
    "panelCode" SMALLINT NOT NULL,
    "refreshRate" SMALLINT NOT NULL,
    "ssdStrorage" SMALLINT NOT NULL,
    "hddStorage" SMALLINT NOT NULL,
    "ram" SMALLINT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "suitableFor" "LaptopSuit" NOT NULL DEFAULT 'PRODUCTIVITY',
    "isNew" BOOLEAN NOT NULL DEFAULT true,
    "gamingScore" SMALLINT NOT NULL,
    "workstationScore" SMALLINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_id_key" ON "Laptop"("id");
