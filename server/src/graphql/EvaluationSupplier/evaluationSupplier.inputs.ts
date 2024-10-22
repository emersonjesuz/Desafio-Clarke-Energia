import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Max, Min } from 'class-validator';

@InputType()
export class EvaluationSupplierInput {
  @Field()
  @IsNotEmpty({ message: 'ID do fornecedor obrigatório' })
  supplierId: string;

  @Field()
  @IsNotEmpty({ message: 'ID da empresa obrigatorio' })
  companyId: string;

  @Field()
  @Min(1, { message: 'Nota Não pode ser menor que 1' })
  @Max(5, { message: 'Nota não pode ser maior que 5' })
  note: number;
}
