import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';
import { SupplierRepository } from '../Supplier/supplier.repository';
import { CompanyRepository } from '../Company/company.repository';
import { ContractRepository } from './contract.repository';

@Module({
  providers: [
    ContractService,
    ContractResolver,
    PrismaService,
    SupplierRepository,
    CompanyRepository,
    ContractRepository,
  ],
  exports: [ContractService],
})
export class ContractModule {}
