import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateSupplierInput } from './createSupplier.inputs';
import { SupplierRepository } from './supplier.repository';
import handleAvarage from '../../helpers/avarage.helper';

@Injectable()
export class SupplierService {
  constructor(private readonly repository: SupplierRepository) {}

  async create(supplier: CreateSupplierInput) {
    const existingSupplier = await this.repository.findOne(supplier);

    if (existingSupplier) {
      switch (true) {
        case existingSupplier.name === supplier.name:
          throw new BadRequestException('Supplier name is already in use');
        case existingSupplier.cnpj === supplier.cnpj:
          throw new BadRequestException('Supplier cnpj is already in use');
      }
    }

    const newSupplier = await this.repository.create(supplier);
    if (!newSupplier)
      throw new InternalServerErrorException("Couldn't create supplier");
    return newSupplier;
  }

  async list(valueKwh: number) {
    const suppliers = await this.repository.findMany();
    const filteredSuppliersByKwh = [];
    suppliers.forEach((supplier) => {
      if (+supplier.minimumKwh < valueKwh) {
        let avarage = 0;

        if (supplier.Evaluations.length) {
          avarage = handleAvarage(supplier.Evaluations);
        }
        filteredSuppliersByKwh.push({ ...supplier, avarage });
      }
    });

    return filteredSuppliersByKwh;
  }
}
