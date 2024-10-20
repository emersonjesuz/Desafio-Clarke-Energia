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
          throw new BadRequestException('the company name is already in use');

        case existingcompany.email === company.email:
          throw new BadRequestException('the company email is already in use');

        case existingcompany.phone === company.phone:
          throw new BadRequestException('the company phone is already in use');
        case existingcompany.cnpj === company.cnpj:
          throw new BadRequestException('company cnpj is already in use');
      }
    }

    const newCompany = await this.Respository.create(company);

    if (!newCompany)
      throw new InternalServerErrorException("Couldn't create company");

    return newCompany;
  }
}
