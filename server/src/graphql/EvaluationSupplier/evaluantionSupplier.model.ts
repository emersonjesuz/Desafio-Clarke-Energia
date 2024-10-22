import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EvaluationSupplier {
  @Field()
  id: number;
  @Field()
  note: number;
  @Field()
  companyId: string;
  @Field()
  supplierId: string;
}
