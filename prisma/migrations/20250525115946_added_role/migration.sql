/*
  Warnings:

  - You are about to drop the column `nama_belakang` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nama_depan` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nicknamegame` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nomor_telp` on the `users` table. All the data in the column will be lost.
  - Added the required column `OwnerId` to the `tournaments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `IdGame` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tournaments" ADD COLUMN     "OwnerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "nama_belakang",
DROP COLUMN "nama_depan",
DROP COLUMN "nicknamegame",
DROP COLUMN "nomor_telp",
ADD COLUMN     "IdGame" INTEGER NOT NULL,
ADD COLUMN     "image" VARCHAR(100),
ADD COLUMN     "role" VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE "tournaments" ADD CONSTRAINT "tournaments_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "users"("UserId") ON DELETE CASCADE ON UPDATE CASCADE;
