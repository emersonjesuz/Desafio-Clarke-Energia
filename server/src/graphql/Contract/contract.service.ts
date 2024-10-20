import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupplierRepository } from '../Supplier/supplier.repository';
import { CompanyRepository } from '../Company/company.repository';
import { ContractRepository } from './contract.repository';
import { ContractInput } from './contract.inputs';

@Injectable()
export class ContractService {
  constructor(
    private readonly repository: ContractRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly supplierRepository: SupplierRepository,
  ) {}

  async create(contractInput: ContractInput): Promise<string> {
    const supplier = await this.supplierRepository.findById(
      contractInput.supplierId,
    );
    if (!supplier) {
      throw new BadRequestException('Supplier not found');
    }

    const company = await this.companyRepository.findById(
      contractInput.companyId,
    );

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    const existingContract = await this.repository.findOne(contractInput);

    if (existingContract) {
      throw new BadRequestException('Contract already exists');
    }

    const newContract = await this.repository.create(contractInput);

    if (!newContract) {
      throw new InternalServerErrorException("Couldn't create contract");
    }

    return 'Contract created successfully';
  }

  async countContractsBySupplier(supplierId: string) {
    return this.repository.countBySupplier(supplierId);
  }
}
