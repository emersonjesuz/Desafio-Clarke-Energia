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
    const company = await this.companyRepository.findById(
      contractInput.companyId,
    );

    switch (true) {
      case !supplier:
        throw new BadRequestException('Fornecedor não encontrado');
      case !company:
        throw new BadRequestException('Empresa não encontrada');

      default:
        break;
    }

    const existingContract = await this.repository.findOne(contractInput);

    if (existingContract) {
      throw new BadRequestException('Contrato ja existe');
    }

    const newContract = await this.repository.create(contractInput);

    if (!newContract) {
      throw new InternalServerErrorException(
        'Não foi possivel criar o contrato',
      );
    }

    return 'Contrato criado com sucesso';
  }

  async countContractsBySupplier(supplierId: string) {
    const supplier = await this.supplierRepository.findById(supplierId);
    if (!supplier) {
      throw new BadRequestException('Fornecedor não encontrado');
    }
    return this.repository.countBySupplier(supplierId);
  }
}
