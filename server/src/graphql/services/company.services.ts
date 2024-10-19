import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyInput } from '../dtos/inputs/createCompany.inputs';

@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  async create(company: CreateCompanyInput) {
    try {
      const existingcompany = await this.prisma.companies.findFirst({
        where: {
          OR: [
            {
              name: company.name,
            },
            {
              email: company.email,
            },
            {
              phone: company.phone,
            },
            {
              cnpj: company.cnpj,
            },
          ],
        },
      });

      if (existingcompany) {
        throw new BadRequestException('company already exists');
      }

      const newCompany = await this.prisma.companies.create({
        data: company,
      });

      return newCompany;
    } catch (error) {
      if (error.status !== 500) {
        throw error;
      }
      throw new InternalServerErrorException("Couldn't create company");
    }
  }
}
