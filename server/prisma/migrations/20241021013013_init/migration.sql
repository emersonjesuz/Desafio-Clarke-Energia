/*
  Warnings:

  - You are about to drop the column `kwr` on the `Companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Companies" DROP COLUMN "kwr",
ADD COLUMN     "kwh" DECIMAL(65,30) NOT NULL DEFAULT 0;
