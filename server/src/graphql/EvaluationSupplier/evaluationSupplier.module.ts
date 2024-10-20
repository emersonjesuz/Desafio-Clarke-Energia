import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationSupplierService } from './evaluationSupplier.service';
import { EvaluationSupplierResolver } from './evaluationSupplier.resolver';

@Module({
  providers: [
    EvaluationSupplierService,
    EvaluationSupplierResolver,
    PrismaService,
  ],
  exports: [EvaluationSupplierService],
})
export class EvaluationSupplierModule {}
