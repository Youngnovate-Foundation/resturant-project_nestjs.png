/*
  Warnings:

  - A unique constraint covering the columns `[userId,othersId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "othersId" INTEGER;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "othersId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_othersId_key" ON "CartItem"("userId", "othersId");

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_othersId_fkey" FOREIGN KEY ("othersId") REFERENCES "Others"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_othersId_fkey" FOREIGN KEY ("othersId") REFERENCES "Others"("id") ON DELETE SET NULL ON UPDATE CASCADE;
