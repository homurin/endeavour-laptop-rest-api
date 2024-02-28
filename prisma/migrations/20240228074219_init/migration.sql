/*
  Warnings:

  - You are about to alter the column `screenshots` on the `Application` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "screenshots" SET DATA TYPE VARCHAR(255);
