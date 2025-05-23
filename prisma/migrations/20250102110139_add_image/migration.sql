/*
  Warnings:

  - Added the required column `image` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "image" VARCHAR(100) NOT NULL;
