import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Contract } from '../Contract/contract.model';
import { EvaluationSupplier } from '../EvaluationSupplier/evaluantionSupplier.model';

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

  @Field()
  state: string;

  @Field(() => Float)
  avarage: number;

  @Field(() => [Contract])
  Contracts: Contract[];

  Evaluations: EvaluationSupplier[];
}
