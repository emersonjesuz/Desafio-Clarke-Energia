import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company } from './company.model';
import { CreateCompanyInput } from './createCompany.inputs';
import { CompanyService } from './company.service';

@Resolver()
export class CompanyResolver {
  constructor(private readonly CompanyService: CompanyService) {}
  @Mutation(() => Company)
  async createCompany(@Args('company') company: CreateCompanyInput) {
    return await this.CompanyService.create(company);
  }
}
