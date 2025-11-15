-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_foodId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Package" DROP CONSTRAINT "Package_foodId_fkey";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
-- Clean up orphaned records in Food table
DELETE FROM "Food" WHERE "id" IN (7, 8, 9, 10, 11, 12);
