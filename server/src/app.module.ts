import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './graphql/resolver/user.resolver';
import { PrismaModule } from './prisma/prisma.module';
import { SupplierResolver } from './graphql/resolver/supplier.resolver';
import { SupplierService } from './graphql/services/supplier.services';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    PrismaModule,
  ],
  providers: [UserResolver, SupplierResolver, SupplierService],
})
export class AppModule {}
