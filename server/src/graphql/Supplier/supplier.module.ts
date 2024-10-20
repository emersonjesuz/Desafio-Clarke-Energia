import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierResolver } from './supplier.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { SupplierRepository } from './supplier.repository';

@Module({
  providers: [
    SupplierService,
    SupplierResolver,
    PrismaService,
    SupplierRepository,
  ],
  exports: [SupplierService],
  imports: [],
})
export class SupplierModule {}
