/*
  Warnings:

  - Changed the type of `biaya` on the `tournaments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "tournaments" DROP COLUMN "biaya",
ADD COLUMN     "biaya" INTEGER NOT NULL;
