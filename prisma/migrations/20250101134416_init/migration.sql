-- CreateTable
CREATE TABLE "User" (
    "UserId" SERIAL NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "nama_depan" VARCHAR(100) NOT NULL,
    "nama_belakang" VARCHAR(100) NOT NULL,
    "nomor_telp" VARCHAR(100) NOT NULL,
    "nicknamegame" VARCHAR(100) NOT NULL,
    "TeamID" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "berita" (
    "BetitaId" SERIAL NOT NULL,
    "judul" VARCHAR(100) NOT NULL,
    "caption" VARCHAR(100) NOT NULL,
    "judul_berita" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "UserId" INTEGER NOT NULL,

    CONSTRAINT "berita_pkey" PRIMARY KEY ("BetitaId")
);

-- CreateTable
CREATE TABLE "Team" (
    "TeamId" SERIAL NOT NULL,
    "namatim" VARCHAR(100) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("TeamId")
);

-- CreateTable
CREATE TABLE "Tournament" (
    "TournamentID" SERIAL NOT NULL,
    "description" VARCHAR(100) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "tipe" VARCHAR(100) NOT NULL,
    "biaya" VARCHAR(100) NOT NULL,
    "LokasiID" INTEGER NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("TournamentID")
);

-- CreateTable
CREATE TABLE "TeamTournament" (
    "date" VARCHAR(100) NOT NULL,
    "result" VARCHAR(100) NOT NULL,
    "TeamID" INTEGER NOT NULL,
    "TournamentID" INTEGER NOT NULL,

    CONSTRAINT "TeamTournament_pkey" PRIMARY KEY ("TeamID","TournamentID")
);

-- CreateTable
CREATE TABLE "Lokasi" (
    "LokasiID" SERIAL NOT NULL,
    "lokasiAcara" VARCHAR(100) NOT NULL,

    CONSTRAINT "Lokasi_pkey" PRIMARY KEY ("LokasiID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "berita" ADD CONSTRAINT "berita_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tournament" ADD CONSTRAINT "Tournament_LokasiID_fkey" FOREIGN KEY ("LokasiID") REFERENCES "Lokasi"("LokasiID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_TeamID_fkey" FOREIGN KEY ("TeamID") REFERENCES "Team"("TeamId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamTournament" ADD CONSTRAINT "TeamTournament_TournamentID_fkey" FOREIGN KEY ("TournamentID") REFERENCES "Tournament"("TournamentID") ON DELETE CASCADE ON UPDATE CASCADE;
