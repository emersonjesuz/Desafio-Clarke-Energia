import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EvaluationSupplierInput } from './evaluationSupplier.inputs';
import { EvaluationSupplierService } from './evaluationSupplier.service';

@Resolver()
export class EvaluationSupplierResolver {
  constructor(
    private readonly EvaluationSupplierService: EvaluationSupplierService,
  ) {}

  @Query(() => Number)
  async calculateAverage(@Args('supplierId') supplierId: string) {
    return this.EvaluationSupplierService.calculateAverage(supplierId);
  }

  @Mutation(() => String)
  addEvaluationSupplier(
    @Args('evaluation') evaluation: EvaluationSupplierInput,
  ) {
    return this.EvaluationSupplierService.evaluate(evaluation);
  }
}
