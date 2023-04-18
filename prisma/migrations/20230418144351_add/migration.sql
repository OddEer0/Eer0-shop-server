/*
  Warnings:

  - You are about to drop the `_CartToDevice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToDevice" DROP CONSTRAINT "_CartToDevice_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToDevice" DROP CONSTRAINT "_CartToDevice_B_fkey";

-- DropTable
DROP TABLE "_CartToDevice";

-- CreateTable
CREATE TABLE "CartDevice" (
    "count" INTEGER NOT NULL,
    "cartId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,

    CONSTRAINT "CartDevice_pkey" PRIMARY KEY ("deviceId")
);

-- AddForeignKey
ALTER TABLE "CartDevice" ADD CONSTRAINT "CartDevice_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartDevice" ADD CONSTRAINT "CartDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
