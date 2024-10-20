import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class EvaluationSupplierInput {
  @Field()
  @IsNotEmpty({ message: 'Supplier ID is required' })
  supplierId: string;

  @Field()
  @IsNotEmpty({ message: 'Company ID is required' })
  companyId: string;

  @Field()
  @Min(1, { message: 'Note must be greater than or equal to 1' })
  @Max(5, { message: 'The grade cannot be greater than 5' })
  note: number;
}
