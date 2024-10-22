import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCompanyInput } from '../Company/createCompany.inputs';
import { CompanyRepository } from './company.repository';

@Injectable()
export class CompanyService {
  constructor(private readonly Respository: CompanyRepository) {}

  async create(company: CreateCompanyInput) {
    const existingcompany = await this.Respository.findOne({
      name: company.name,
      email: company.email,
      phone: company.phone,
      cnpj: company.cnpj,
    });
    if (existingcompany) {
      switch (true) {
        case existingcompany.name === company.name:
          throw new BadRequestException('Nome do cliente já esta em uso');

        case existingcompany.email === company.email:
          throw new BadRequestException('Email do cliente está em uso');

        case existingcompany.phone === company.phone:
          throw new BadRequestException('Telefone do cliente está em uso');
        case existingcompany.cnpj === company.cnpj:
          throw new BadRequestException('CNPJ do cliente está em uso');
      }
    }

    const newCompany = await this.Respository.create(company);

    if (!newCompany)
      throw new InternalServerErrorException(
        'Não foi possivel criar o cliente',
      );

    return newCompany;
  }

  async findOne({ email, id }: { email?: string; id?: string }) {
    const existingcompany = email
      ? await this.Respository.findOne({ email })
      : await this.Respository.findById(id);

    if (!existingcompany)
      throw new BadRequestException('Cliente não encontrado');

    return existingcompany;
  }
}
