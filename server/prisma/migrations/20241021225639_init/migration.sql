/*
  Warnings:

  - You are about to drop the `Evaluation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Evaluation" DROP CONSTRAINT "Evaluation_supplierId_fkey";

-- DropTable
DROP TABLE "Evaluation";

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" SERIAL NOT NULL,
    "note" INTEGER NOT NULL,
    "supplierId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
