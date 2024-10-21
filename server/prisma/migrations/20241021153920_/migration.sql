/*
  Warnings:

  - Added the required column `state` to the `Suppliers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Suppliers" ADD COLUMN     "state" TEXT NOT NULL;
