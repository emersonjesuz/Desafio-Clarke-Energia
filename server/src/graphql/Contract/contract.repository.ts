import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ContractInput } from './contract.inputs';

@Injectable()
export class ContractRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(contract: ContractInput) {
    return await this.prisma.contracts.create({
      data: contract,
    });
  }

  async findOne(contract: ContractInput) {
    return this.prisma.contracts.findFirst({
      where: contract,
    });
  }

  async countBySupplier(supplierId: string) {
    return this.prisma.contracts.count({
      where: {
        supplierId,
      },
    });
  }
}
