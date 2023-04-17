-- CreateTable
CREATE TABLE "Cart" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "_CartToDevice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CartToDevice_AB_unique" ON "_CartToDevice"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToDevice_B_index" ON "_CartToDevice"("B");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToDevice" ADD CONSTRAINT "_CartToDevice_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToDevice" ADD CONSTRAINT "_CartToDevice_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
