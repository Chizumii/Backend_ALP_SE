/*
  Warnings:

  - The primary key for the `Berita` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `BetitaId` on the `Berita` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Berita" DROP CONSTRAINT "Berita_pkey",
DROP COLUMN "BetitaId",
ADD COLUMN     "BeritaId" SERIAL NOT NULL,
ADD CONSTRAINT "Berita_pkey" PRIMARY KEY ("BeritaId");
