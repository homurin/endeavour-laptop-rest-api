/*
  Warnings:

  - You are about to alter the column `name` on the `Application` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Made the column `name` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(50);
