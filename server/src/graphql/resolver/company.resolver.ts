import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company } from '../dtos/models/comapny.model';
import { CreateCompanyInput } from '../dtos/inputs/createCompany.inputs';
import { CompanyService } from '../services/company.services';

@Resolver()
export class CompanyResolver {
  constructor(private readonly CompanyService: CompanyService) {}
  @Mutation(() => Company)
  async createCompany(@Args('company') company: CreateCompanyInput) {
    return await this.CompanyService.create(company);
  }
}
