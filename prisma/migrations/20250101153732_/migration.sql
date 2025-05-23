/*
  Warnings:

  - You are about to drop the `berita` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "berita" DROP CONSTRAINT "berita_UserId_fkey";

-- DropTable
DROP TABLE "berita";

-- CreateTable
CREATE TABLE "Berita" (
    "BetitaId" SERIAL NOT NULL,
    "judul" VARCHAR(100) NOT NULL,
    "caption" VARCHAR(100) NOT NULL,
    "judul_berita" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("BetitaId")
);

-- AddForeignKey
ALTER TABLE "Berita" ADD CONSTRAINT "Berita_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE CASCADE ON UPDATE CASCADE;
