import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EvaluationSupplierInput } from './evaluationSupplier.inputs';

@Injectable()
export class EvaluationSupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async evaluate(evaluationInput: EvaluationSupplierInput): Promise<string> {
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
      throw new NotFoundException('Supplier not found');
    }

    const company = await this.prisma.companies.findUnique({
      where: {
        id: evaluationInput.companyId,
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const existeEvaluation = supplier.Evaluation.findIndex((evaluation) => {
      return evaluation.companyId === evaluationInput.companyId;
    });

    if (existeEvaluation !== -1) {
      throw new BadRequestException('Evaluation already exists');
    }

    await this.prisma.evaluation.create({
      data: {
        note: evaluationInput.note,
        supplierId: evaluationInput.supplierId,
        companyId: evaluationInput.companyId,
      },
    });
    return 'Evaluation created successfully';
  }

  async calculateAverage(supplierId: string): Promise<number> {
    const evaluations = await this.prisma.evaluation.findMany({
      where: {
        supplierId,
      },
    });

    if (evaluations.length === 0) {
      return 0;
    }

    const sum = evaluations.reduce(
      (acc, evaluation) => acc + evaluation.note,
      0,
    );
    const average = sum / evaluations.length;
    return average;
  }
}
