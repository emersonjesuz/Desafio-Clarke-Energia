import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Contract {
  @Field()
  id: string;

  @Field()
  companyId: string;

  @Field()
  supplierId: string;
}
