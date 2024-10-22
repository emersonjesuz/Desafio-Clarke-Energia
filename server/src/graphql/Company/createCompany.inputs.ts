import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field()
  @IsNotEmpty({ message: 'Nome é obrigatorio' })
  name: string;

  @Field()
  @IsEmail({}, { message: 'Email precisa ser valido' })
  email: string;

  @Field()
  @IsString()
  @Matches(/^\d+$/, {
    message: 'Telefone deve conter apenas números.',
  })
  @MinLength(10, {
    message: 'Telefone deve ter no mínimo 10 dígitos.',
  })
  @MaxLength(11, {
    message: 'Telefone deve ter no máximo 11 dígitos.',
  })
  phone: string;

  @Field()
  @Length(14, 14, { message: 'CNPJ deve ter 14 caracteres.' })
  cnpj: string;

  @Field()
  @Min(1, { message: 'KWH deve ser maior que 0.' })
  kwh: number;
}
