import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Min } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  logo: string;

  @Field()
  @Min(1, { message: 'minimum KWH must be greater than 0' })
  minimumKwh: number;

  @Field()
  @Min(1, { message: 'KWH amount must be greater than 0' })
  kwhAmount: number;

  @Field()
  @IsNotEmpty({ message: 'CNPJ is required' })
  cnpj: string;
}
