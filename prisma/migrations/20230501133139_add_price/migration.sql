/*
  Warnings:

  - Added the required column `price` to the `BookingsDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `PurchaseDevice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingsDevice" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseDevice" ADD COLUMN     "price" INTEGER NOT NULL;
