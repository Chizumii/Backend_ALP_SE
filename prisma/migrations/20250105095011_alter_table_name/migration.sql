/*
  Warnings:

  - You are about to drop the `Berita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lokasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamTournament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tournament` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Berita" DROP CONSTRAINT "Berita_UserId_fkey";

-- DropForeignKey
ALTER TABLE "TeamTournament" DROP CONSTRAINT "TeamTournament_TeamID_fkey";

-- DropForeignKey
ALTER TABLE "TeamTournament" DROP CONSTRAINT "TeamTournament_TournamentID_fkey";

-- DropForeignKey
ALTER TABLE "Tournament" DROP CONSTRAINT "Tournament_LokasiID_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_TeamID_fkey";

-- DropTable
DROP TABLE "Berita";

-- DropTable
DROP TABLE "Lokasi";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamTournament";

-- DropTable
DROP TABLE "Tournament";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "UserId" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "nama_depan" VARCHAR(100) NOT NULL,
    "nama_belakang" VARCHAR(100) NOT NULL,
    "nomor_telp" VARCHAR(100) NOT NULL,
    "nicknamegame" VARCHAR(100) NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "Token" VARCHAR(100) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "beritas" (
    "BeritaId" SERIAL NOT NULL,
    "judul" VARCHAR(100) NOT NULL,
    "caption" VARCHAR(100) NOT NULL,
    "judul_berita" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "beritas_pkey" PRIMARY KEY ("BeritaId")
);

-- CreateTable
CREATE TABLE "teams" (
    "TeamId" SERIAL NOT NULL,
    "namatim" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("TeamId")
);

-- CreateTable
CREATE TABLE "tournaments" (
    "TournamentID" SERIAL NOT NULL,
    "nama_tournament" VARCHAR(100) NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "tipe" VARCHAR(100) NOT NULL,
    "biaya" VARCHAR(100) NOT NULL,
    "LokasiID" INTEGER NOT NULL,

    CONSTRAINT "tournaments_pkey" PRIMARY KEY ("TournamentID")
);

-- CreateTable
CREATE TABLE "team_tournaments" (
    "date" VARCHAR(100) NOT NULL,
    "result" VARCHAR(100) NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "TournamentID" INTEGER NOT NULL,

    CONSTRAINT "team_tournaments_pkey" PRIMARY KEY ("TeamID","TournamentID")
);

-- CreateTable
CREATE TABLE "lokasis" (
    "LokasiID" SERIAL NOT NULL,
    "lokasiAcara" VARCHAR(100) NOT NULL,

    CONSTRAINT "lokasis_pkey" PRIMARY KEY ("LokasiID")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "teams"("TeamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "beritas" ADD CONSTRAINT "beritas_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "users"("UserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_LokasiID_fkey" FOREIGN KEY ("LokasiID") REFERENCES "lokasis"("LokasiID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_tournaments" ADD CONSTRAINT "team_tournaments_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "teams"("TeamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_tournaments" ADD CONSTRAINT "team_tournaments_TournamentID_fkey" FOREIGN KEY ("TournamentID") REFERENCES "tournaments"("TournamentID") ON DELETE CASCADE ON UPDATE CASCADE;
