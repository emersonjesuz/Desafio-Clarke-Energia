import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Company {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  cnpj: string;

  @Field()
  kwh: number;
}
