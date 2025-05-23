/*
  Warnings:

  - Added the required column `nama_tournament` to the `Tournament` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tournament" ADD COLUMN     "nama_tournament" VARCHAR(100) NOT NULL;
