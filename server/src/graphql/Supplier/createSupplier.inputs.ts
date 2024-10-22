import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, Min } from 'class-validator';

@InputType()
export class CreateSupplierInput {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatorio' })
  name: string;

  @Field()
  logo: string;

  @Field()
  @Min(1, { message: 'Minimo de kWh deve ser 1' })
  minimumKwh: number;

  @Field()
  @Min(1, { message: 'Valor de kWh deve ser maior que 0' })
  kwhAmount: number;

  @Field()
  @Length(14, 14, { message: 'CNPJ deve ter 14 caracteres.' })
  cnpj: string;

  @Field()
  @Length(2, 2, { message: 'UF deve ter 2 caracteres.' })
  state: string;
}
