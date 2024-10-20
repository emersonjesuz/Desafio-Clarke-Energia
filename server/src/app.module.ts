import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SupplierModule } from './graphql/Supplier/supplier.module';
import { PrismaModule } from './prisma/prisma.module';
import { EvaluationSupplierModule } from './graphql/EvaluationSupplier/evaluationSupplier.module';
import { CompanyModule } from './graphql/Company/company.module';
import { ContractModule } from './graphql/Contract/contract.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
    SupplierModule,
    EvaluationSupplierModule,
    CompanyModule,
    ContractModule,
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
