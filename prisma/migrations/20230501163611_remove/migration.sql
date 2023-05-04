/*
  Warnings:

  - You are about to drop the column `price` on the `BookingsDevice` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `BookingsDevice` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `PurchaseDevice` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `PurchaseDevice` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Refound` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Refound` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookingsDevice" DROP COLUMN "price",
DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "PurchaseDevice" DROP COLUMN "price",
DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "Refound" DROP COLUMN "price",
DROP COLUMN "stock";
