import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
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
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @Field()
  @IsString()
  @Matches(/^\d+$/, { message: 'The phone number must contain numbers only.' })
  @MinLength(10, { message: 'Phone number must be at least 10 digits long.' })
  @MaxLength(11, { message: 'Phone number must be no longer than 11 digits.' })
  phone: string;

  @Field()
  @Length(14, 14, { message: 'CNPJ must be 14 characters long.' })
  cnpj: string;
}
