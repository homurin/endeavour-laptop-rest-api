/*
  Warnings:

  - You are about to drop the column `minOs` on the `Application` table. All the data in the column will be lost.
  - Added the required column `bitOs` to the `Application` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winId` to the `Application` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Application" DROP COLUMN "minOs",
ADD COLUMN     "bitOs" SMALLINT NOT NULL,
ADD COLUMN     "winId" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_winId_fkey" FOREIGN KEY ("winId") REFERENCES "Windows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
