import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SupplierService, SupplierResolver, PrismaService],
  exports: [SupplierService],
  imports: [],
})
export class SupplierModule {}
