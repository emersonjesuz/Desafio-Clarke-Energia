import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ContractInput {
  @Field()
  @IsNotEmpty({ message: 'Supplier ID is required' })
  supplierId: string;

  @Field()
  @IsNotEmpty({ message: 'Company ID is required' })
  companyId: string;
}
