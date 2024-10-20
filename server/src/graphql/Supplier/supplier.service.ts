import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSupplierInput } from './createSupplier.inputs';
import { SupplierRepository } from './supplier.repository';

@Injectable()
export class SupplierService {
  constructor(private readonly repository: SupplierRepository) {}

  async create(supplier: CreateSupplierInput) {
    const existingSupplier = await this.repository.findOne(supplier);

    if (existingSupplier) {
      switch (true) {
        case existingSupplier.name === supplier.name:
          throw new BadRequestException('Supplier is already in use');
        case existingSupplier.cnpj === supplier.cnpj:
          throw new BadRequestException('Supplier is already in use');
      }
    }

    const newSupplier = await this.repository.create(supplier);
    if (!newSupplier)
      throw new InternalServerErrorException("Couldn't create supplier");
    return newSupplier;
  }

  async list(valueKwh: number) {
    const suppliers = await this.repository.findMany();
    const filteredSuppliersByKwh = suppliers.filter((supplier) => {
      return +supplier.minimumKwh < valueKwh;
    });

    return filteredSuppliersByKwh;
  }
}
