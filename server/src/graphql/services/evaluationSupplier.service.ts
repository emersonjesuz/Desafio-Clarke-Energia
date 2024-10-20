import { UserInputError } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EvaluationSupplierInput } from '../dtos/inputs/evaluationSupplier.inputs';

@Injectable()
export class EvaluationSupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async evaluate(evaluationInput: EvaluationSupplierInput) {
    const supplier = await this.prisma.suppliers.findUnique({
      where: {
        id: evaluationInput.supplierId,
      },
      include: {
        Evaluation: {
          select: {
            companyId: true,
          },
        },
      },
    });

    if (!supplier) {
      throw new UserInputError('Supplier not found');
    }

    const company = await this.prisma.companies.findUnique({
      where: {
        id: evaluationInput.companyId,
      },
    });

    if (!company) {
      throw new UserInputError('Company not found');
    }

    const existeEvaluation = supplier.Evaluation.includes({
      companyId: evaluationInput.companyId,
    });

    if (existeEvaluation) {
      throw new UserInputError('Evaluation already exists');
    }

    await this.prisma.evaluation.create({
      data: {
        note: evaluationInput.note,
        supplierId: evaluationInput.supplierId,
        companyId: evaluationInput.companyId,
      },
    });
  }
}
