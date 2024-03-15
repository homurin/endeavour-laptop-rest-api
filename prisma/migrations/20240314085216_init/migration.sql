-- CreateEnum
CREATE TYPE "PanelType" AS ENUM ('CRT', 'LCD', 'LED', 'TN', 'IPS', 'VA', 'OLED', 'AMOLED');

-- CreateEnum
CREATE TYPE "LaptopSuit" AS ENUM ('GAMING', 'DESIGN', 'PRODUCTIVITY');

-- CreateEnum
CREATE TYPE "WindowsEdition" AS ENUM ('HOME', 'S', 'PRO');

-- CreateTable
CREATE TABLE "Admin" (
    "id" VARCHAR(36) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "fullName" VARCHAR(60) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(72) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gpu" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "benchmark" INTEGER NOT NULL,
    "price" MONEY NOT NULL,
    "cores" INTEGER NOT NULL,
    "directX" DOUBLE PRECISION NOT NULL,
    "openGl" DOUBLE PRECISION NOT NULL,
    "baseSpeed" INTEGER NOT NULL,
    "maxSpeed" INTEGER NOT NULL,
    "memory" DOUBLE PRECISION NOT NULL,
    "memorySpeed" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cpu" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
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
    "adminId" TEXT NOT NULL,
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
    "image" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laptop" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "cpuId" VARCHAR(36),
    "gpuId" VARCHAR(36),
    "winId" VARCHAR(36),
    "brandId" VARCHAR(36),
    "thumbId" VARCHAR(36),
    "videosId" VARCHAR(36),
    "name" VARCHAR(255) NOT NULL,
    "ram" DOUBLE PRECISION NOT NULL,
    "ssdStorage" DOUBLE PRECISION NOT NULL,
    "hddStorage" DOUBLE PRECISION NOT NULL,
    "price" MONEY NOT NULL DEFAULT 0,
    "displayName" VARCHAR(50),
    "displaySize" SMALLINT,
    "displayResolution" VARCHAR(50),
    "panelType" "PanelType",
    "panelCode" SMALLINT,
    "refreshRate" SMALLINT,
    "weight" DECIMAL,
    "suitableFor" "LaptopSuit" DEFAULT 'PRODUCTIVITY',
    "isNew" BOOLEAN DEFAULT true,
    "gamingScore" DOUBLE PRECISION DEFAULT 0.0,
    "workstationScore" DOUBLE PRECISION DEFAULT 0.0,
    "osEdition" "WindowsEdition" DEFAULT 'HOME',
    "thumb" VARCHAR(255),
    "videos" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" VARCHAR(36) NOT NULL,
    "adminId" VARCHAR(36) NOT NULL,
    "winId" VARCHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "headerImageId" VARCHAR(36),
    "screenshotsId" VARCHAR(36),
    "moviesId" VARCHAR(36),
    "price" MONEY DEFAULT 0,
    "description" TEXT,
    "website" VARCHAR(255),
    "link" VARCHAR(255),
    "developers" VARCHAR(255),
    "publishers" VARCHAR(255),
    "headerImage" TEXT,
    "screenshots" TEXT,
    "movies" TEXT,
    "windows" BOOLEAN NOT NULL DEFAULT false,
    "mac" BOOLEAN NOT NULL DEFAULT false,
    "linux" BOOLEAN NOT NULL DEFAULT false,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "minCpuSpeed" DOUBLE PRECISION NOT NULL,
    "minCores" DOUBLE PRECISION NOT NULL,
    "minDirectX" DOUBLE PRECISION NOT NULL,
    "minOpenGl" DOUBLE PRECISION NOT NULL,
    "minGpuMemory" DOUBLE PRECISION NOT NULL,
    "minGpuBoostClock" DOUBLE PRECISION NOT NULL,
    "minRam" DOUBLE PRECISION NOT NULL,
    "minStorage" DOUBLE PRECISION NOT NULL,
    "bitOs" SMALLINT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_id_key" ON "Admin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

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
CREATE UNIQUE INDEX "Laptop_id_key" ON "Laptop"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Application_id_key" ON "Application"("id");

-- AddForeignKey
ALTER TABLE "Brand" ADD CONSTRAINT "Brand_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gpu" ADD CONSTRAINT "Gpu_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cpu" ADD CONSTRAINT "Cpu_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Windows" ADD CONSTRAINT "Windows_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_laptopId_fkey" FOREIGN KEY ("laptopId") REFERENCES "Laptop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_cpuId_fkey" FOREIGN KEY ("cpuId") REFERENCES "Cpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_gpuId_fkey" FOREIGN KEY ("gpuId") REFERENCES "Gpu"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Laptop" ADD CONSTRAINT "Laptop_winId_fkey" FOREIGN KEY ("winId") REFERENCES "Windows"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_winId_fkey" FOREIGN KEY ("winId") REFERENCES "Windows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
