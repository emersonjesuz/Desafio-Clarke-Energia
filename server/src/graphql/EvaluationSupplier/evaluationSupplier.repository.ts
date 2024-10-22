import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EvaluationSupplierInput } from './evaluationSupplier.inputs';

@Injectable()
export class EvaluationSupplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(evaluationInput: EvaluationSupplierInput) {
    return await this.prisma.evaluations.create({
      data: {
        note: evaluationInput.note,
        supplierId: evaluationInput.supplierId,
        companyId: evaluationInput.companyId,
      },
    });
  }

  async findBySupplier(supplierId: string) {
    return await this.prisma.evaluations.findMany({
      where: {
        supplierId,
      },
    });
  }
}
