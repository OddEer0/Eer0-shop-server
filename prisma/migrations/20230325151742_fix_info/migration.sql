/*
  Warnings:

  - You are about to drop the column `description` on the `Info` table. All the data in the column will be lost.
  - You are about to drop the column `info` on the `Info` table. All the data in the column will be lost.
  - Added the required column `name` to the `Info` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Info` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Info" DROP COLUMN "description",
DROP COLUMN "info",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
