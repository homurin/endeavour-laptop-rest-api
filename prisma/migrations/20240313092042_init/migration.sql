/*
  Warnings:

  - You are about to drop the column `minThreads` on the `Application` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "minThreads",
ALTER COLUMN "price" DROP NOT NULL;
