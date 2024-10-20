-- CreateTable
CREATE TABLE "Contracts" (
    "id" SERIAL NOT NULL,
    "supplierId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Contracts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contracts" ADD CONSTRAINT "Contracts_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
