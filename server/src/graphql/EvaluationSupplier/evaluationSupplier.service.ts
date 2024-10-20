import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRepository } from '../Company/company.repository';
import { SupplierRepository } from '../Supplier/supplier.repository';
import { EvaluationSupplierInput } from './evaluationSupplier.inputs';
import { EvaluationSupplierRepository } from './evaluationSupplier.repository';

@Injectable()
export class EvaluationSupplierService {
  constructor(
    private readonly repository: EvaluationSupplierRepository,
    private readonly supplierRepository: SupplierRepository,
    private readonly companyRepository: CompanyRepository,
  ) {}

  async evaluate(evaluationInput: EvaluationSupplierInput): Promise<string> {
    const supplier = await this.supplierRepository.findById(
      evaluationInput.supplierId,
    );

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    const company = await this.companyRepository.findById(
      evaluationInput.companyId,
    );

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const existeEvaluation = supplier.Evaluation.findIndex((evaluation) => {
      return evaluation.companyId === evaluationInput.companyId;
    });

    if (existeEvaluation !== -1) {
      throw new BadRequestException('Evaluation already exists');
    }

    const newEvaluation = await this.repository.create(evaluationInput);

    if (!newEvaluation)
      throw new InternalServerErrorException('Evaluation not created');

    return 'Evaluation created successfully';
  }

  async calculateAverage(supplierId: string): Promise<number> {
    const supplier = await this.supplierRepository.findById(supplierId);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    const evaluations = supplier.Evaluation;

    if (evaluations.length === 0) {
      return 0;
    }

    const sum = evaluations.reduce(
      (acc, evaluation) => acc + evaluation.note,
      0,
    );
    const average = sum / evaluations.length;
    // quero que ele traga numero tipo um decimo como 2.6
    return Number(average.toFixed(1));
  }
}
