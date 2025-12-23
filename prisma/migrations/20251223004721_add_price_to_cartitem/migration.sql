/*
  Warnings:

  - A unique constraint covering the columns `[userId,foodId,drinkId,othersId]` on the table `CartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CartItem_userId_drinkId_key";

-- DropIndex
DROP INDEX "CartItem_userId_foodId_key";

-- DropIndex
DROP INDEX "CartItem_userId_othersId_key";

-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "price" DOUBLE PRECISION;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_foodId_drinkId_othersId_key" ON "CartItem"("userId", "foodId", "drinkId", "othersId");
