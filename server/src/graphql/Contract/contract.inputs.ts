import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ContractInput {
  @Field()
  @IsNotEmpty({ message: 'ID do fornecedor obrigatório' })
  supplierId: string;

  @Field()
  @IsNotEmpty({ message: 'ID da empresa obrigatorio' })
  companyId: string;
}
