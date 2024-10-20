import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationSupplierService } from './evaluationSupplier.service';
import { EvaluationSupplierResolver } from './evaluationSupplier.resolver';
import { EvaluationSupplierRepository } from './evaluationSupplier.repository';
import { SupplierRepository } from '../Supplier/supplier.repository';
import { CompanyRepository } from '../Company/company.repository';

@Module({
  providers: [
    EvaluationSupplierService,
    EvaluationSupplierResolver,
    PrismaService,
    EvaluationSupplierRepository,
    SupplierRepository,
    CompanyRepository,
  ],
  exports: [EvaluationSupplierService],
})
export class EvaluationSupplierModule {}
