import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSupplierInput } from '../dtos/inputs/createSupplier.inputs';

@Injectable()
export class SupplierService {
  private prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

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
        throw new BadRequestException('Supplier already exists');
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
      const filteredSuppliersByKwr = suppliers.filter((supplier) => {
        return +supplier.minimumKwh < valueKwh;
      });

      return filteredSuppliersByKwr;
    } catch (error) {
      throw new InternalServerErrorException("Couldn't list suppliers");
    }
  }
}
