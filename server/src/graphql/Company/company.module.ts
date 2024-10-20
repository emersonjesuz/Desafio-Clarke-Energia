import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CompanyService, CompanyResolver, PrismaService],
  exports: [CompanyService],
})
export class CompanyModule {}
