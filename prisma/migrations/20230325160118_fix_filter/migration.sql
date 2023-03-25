/*
  Warnings:

  - Added the required column `title` to the `Filter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Filter" ADD COLUMN     "title" TEXT NOT NULL;
