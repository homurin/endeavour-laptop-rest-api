/*
  Warnings:

  - You are about to drop the column `name` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `image` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "name",
ADD COLUMN     "image" VARCHAR(50) NOT NULL;
