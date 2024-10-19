import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierInput } from '../dtos/inputs/createSupplier.inputs';

@Injectable()
export class SupplierService {
  private prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(supplier: CreateSupplierInput) {
    const newSupplier = await this.prisma.suppliers.create({
      data: supplier,
    });
    return newSupplier;
  }

  async list(valueKwr: number) {
    const suppliers = await this.prisma.suppliers.findMany();
    const filteredSuppliersByKwr = suppliers.filter((supplier) => {
      return +supplier.minimumKwh < valueKwr;
    });

    return filteredSuppliersByKwr;
  }
}
