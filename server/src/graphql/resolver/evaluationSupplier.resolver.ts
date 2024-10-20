import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { EvaluationSupplierInput } from '../dtos/inputs/evaluationSupplier.inputs';
import { EvaluationSupplierService } from '../services/evaluationSupplier.service';

@Resolver()
export class EvaluationSupplierResolver {
  constructor(
    private readonly EvaluationSupplierService: EvaluationSupplierService,
  ) {}

  @Mutation(() => String)
  addEvaluationSupplier(
    @Args('evaluation') evaluation: EvaluationSupplierInput,
  ) {
    this.EvaluationSupplierService.evaluate(evaluation);
    return 'Evaluate with success';
  }
}
