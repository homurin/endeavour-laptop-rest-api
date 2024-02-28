/*
  Warnings:

  - Added the required column `buyUrl` to the `Laptop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Laptop" ADD COLUMN     "buyUrl" VARCHAR(255) NOT NULL,
ALTER COLUMN "thumb" DROP NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0;
