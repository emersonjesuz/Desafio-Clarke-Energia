import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContractInput } from './contract.inputs';
import { ContractService } from './contract.service';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class ContractResolver {
  constructor(private readonly ContractService: ContractService) {}

  @Query(() => Number)
  async countContracts(@Args('supplierId') supplierId: string) {
    if (!supplierId) {
      throw new BadRequestException('ID do fornecedor é obrigatório');
    }
    return await this.ContractService.countContractsBySupplier(supplierId);
  }

  @Mutation(() => String)
  async createContract(@Args('contract') contract: ContractInput) {
    return await this.ContractService.create(contract);
  }
}
