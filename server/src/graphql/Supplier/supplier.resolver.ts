import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Supplier } from './supplier.model';
import { SupplierService } from './supplier.service';
import { BadRequestException } from '@nestjs/common';
import { CreateSupplierInput } from './createSupplier.inputs';

@Resolver()
export class SupplierResolver {
  constructor(private readonly SupplierService: SupplierService) {}
  @Query(() => [Supplier])
  async listSuppliers(@Args('valueKwh') valueKwh: number) {
    if (valueKwh <= 0) {
      throw new BadRequestException('Value KWH must be greater than 0');
    }
    return await this.SupplierService.list(valueKwh);
  }

  @Mutation(() => Supplier)
  async createSupplier(@Args('supplier') supplier: CreateSupplierInput) {
    return await this.SupplierService.create(supplier);
  }
}
