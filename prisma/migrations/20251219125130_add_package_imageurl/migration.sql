-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_foodId_fkey";

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "drinkId" INTEGER,
ADD COLUMN     "imageUrl" TEXT,
ALTER COLUMN "foodId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_drinkId_fkey" FOREIGN KEY ("drinkId") REFERENCES "Drink"("id") ON DELETE SET NULL ON UPDATE CASCADE;
