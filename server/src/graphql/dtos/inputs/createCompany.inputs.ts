import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateCompanyInput {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Matches(/^\d+$/, { message: 'Phone number must contain only digits.' })
  @MinLength(10, { message: 'Phone number must be at least 10 digits long.' })
  @MaxLength(11, { message: 'Phone number must be no longer than 11 digits.' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'CNPJ is required' })
  cnpj: string;
}
