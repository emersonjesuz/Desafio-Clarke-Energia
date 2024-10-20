import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierInput } from './createSupplier.inputs';

@Injectable()
export class SupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async create(supplier: CreateSupplierInput) {
    try {
      const existingSupplier = await this.prisma.suppliers.findFirst({
        where: {
          OR: [
            {
              name: supplier.name,
            },
            {
              cnpj: supplier.cnpj,
            },
          ],
        },
      });

      if (existingSupplier) {
        switch (true) {
          case existingSupplier.name === supplier.name:
            throw new BadRequestException('Supplier is already in use');
          case existingSupplier.cnpj === supplier.cnpj:
            throw new BadRequestException('Supplier is already in use');
        }
      }

      const newSupplier = await this.prisma.suppliers.create({
        data: supplier,
      });

      return newSupplier;
    } catch (error) {
      if (error.status !== 500) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't create supplier");
    }
  }

  async list(valueKwh: number) {
    try {
      const suppliers = await this.prisma.suppliers.findMany();
      const filteredSuppliersByKwh = suppliers.filter((supplier) => {
        return +supplier.minimumKwh < valueKwh;
      });

      return filteredSuppliersByKwh;
    } catch (error) {
      throw new InternalServerErrorException("Couldn't list suppliers");
    }
  }
}
