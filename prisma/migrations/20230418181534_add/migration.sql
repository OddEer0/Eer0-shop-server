/*
  Warnings:

  - The primary key for the `CartDevice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CartDevice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CartDevice" DROP CONSTRAINT "CartDevice_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "CartDevice_pkey" PRIMARY KEY ("count");
