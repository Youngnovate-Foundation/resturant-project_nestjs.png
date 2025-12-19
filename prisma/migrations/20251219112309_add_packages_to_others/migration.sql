-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "othersId" INTEGER;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_othersId_fkey" FOREIGN KEY ("othersId") REFERENCES "Others"("id") ON DELETE SET NULL ON UPDATE CASCADE;
