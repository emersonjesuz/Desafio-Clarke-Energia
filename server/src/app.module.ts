import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CompanyResolver } from './graphql/resolver/company.resolver';
import { PrismaModule } from './prisma/prisma.module';
import { SupplierResolver } from './graphql/resolver/supplier.resolver';
import { SupplierService } from './graphql/services/supplier.service';
import { CompanyService } from './graphql/services/company.service';
import { EvaluationSupplierResolver } from './graphql/resolver/evaluationSupplier.resolver';
import { EvaluationSupplierService } from './graphql/services/evaluationSupplier.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
  ],
  providers: [
    CompanyResolver,
    CompanyService,
    SupplierResolver,
    SupplierService,
    EvaluationSupplierResolver,
    EvaluationSupplierService,
  ],
  exports: [],
})
export class AppModule {}
