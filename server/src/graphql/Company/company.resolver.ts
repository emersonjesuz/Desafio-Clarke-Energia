import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company } from './company.model';
import { CreateCompanyInput } from './createCompany.inputs';
import { CompanyService } from './company.service';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class CompanyResolver {
  constructor(private readonly CompanyService: CompanyService) {}
  @Query(() => Company)
  async findCompany(
    @Args('id', { nullable: true }) id?: string,
    @Args('email', { nullable: true }) email?: string,
  ) {
    if (!email && !id)
      throw new BadRequestException('Email ou ID precisam ser informados');
    return await this.CompanyService.findOne({ email, id });
  }

  @Mutation(() => Company)
  async createCompany(@Args('company') company: CreateCompanyInput) {
    return await this.CompanyService.create(company);
  }
}
