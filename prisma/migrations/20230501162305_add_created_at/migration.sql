/*
  Warnings:

  - Added the required column `updatedAt` to the `BookingsDevice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Refound` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookingsDevice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PurchaseDevice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Refound" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
