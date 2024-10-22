import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSupplierInput } from './createSupplier.inputs';

@Injectable()
export class SupplierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(supplier: CreateSupplierInput) {
    return await this.prisma.suppliers.create({
      data: supplier,
    });
  }

  async findOne(supplier: CreateSupplierInput) {
    return await this.prisma.suppliers.findFirst({
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
      include: {
        Contracts: true,
        Evaluations: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.suppliers.findUnique({
      where: {
        id,
      },
      include: {
        Contracts: true,
        Evaluations: true,
      },
    });
  }

  async findMany() {
    return await this.prisma.suppliers.findMany({
      include: {
        Evaluations: true,
        Contracts: true,
      },
    });
  }
}
