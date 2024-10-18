import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Supplier } from '../dtos/models/supplier.model';
import { SupplierService } from '../services/supplier.services';
import { BadRequestException } from '@nestjs/common';
import { CreateSupplierInput } from '../dtos/inputs/createSupplier.inputs';

@Resolver()
export class SupplierResolver {
  constructor(private readonly SupplierService: SupplierService) {}
  @Query(() => [Supplier])
  async listSuppliers(@Args('valueKwr') valueKwr: number) {
    if (valueKwr <= 0) {
      throw new BadRequestException('valueKwr must be greater than 0');
    }
    return await this.SupplierService.list(valueKwr);
  }
}
