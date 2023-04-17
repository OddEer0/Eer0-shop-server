/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CartToDevice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CartToDevice" DROP CONSTRAINT "_CartToDevice_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToDevice" DROP CONSTRAINT "_CartToDevice_B_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "_CartToDevice";
