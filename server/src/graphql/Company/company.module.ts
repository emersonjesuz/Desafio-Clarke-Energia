import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyRepository } from './company.repository';

@Module({
  providers: [
    CompanyService,
    CompanyResolver,
    PrismaService,
    CompanyRepository,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
