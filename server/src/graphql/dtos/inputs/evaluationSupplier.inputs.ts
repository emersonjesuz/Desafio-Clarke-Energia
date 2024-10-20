import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min, min } from 'class-validator';

@InputType()
export class EvaluationSupplierInput {
  @Field()
  @IsNotEmpty({ message: 'Supplier ID is required' })
  supplierId: string;

  @Field()
  @IsNotEmpty({ message: 'Company ID is required' })
  companyId: string;

  @Field()
  @Min(0, { message: 'The grade cannot be less than 0' })
  @Max(5, { message: 'The grade cannot be greater than 5' })
  note: number;
}
