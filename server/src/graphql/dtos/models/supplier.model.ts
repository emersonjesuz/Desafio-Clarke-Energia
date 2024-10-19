import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Supplier {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  logo: string;

  @Field()
  minimumKwh: number;

  @Field()
  kwhAmount: number;

  @Field()
  cnpj: string;
}
