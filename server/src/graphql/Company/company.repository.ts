import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyInput } from './createCompany.inputs';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(company: CreateCompanyInput) {
    return await this.prisma.companies.create({
      data: company,
    });
  }

  async findOne(company: CreateCompanyInput) {
    return await this.prisma.companies.findFirst({
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
  }
}
