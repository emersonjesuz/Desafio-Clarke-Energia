import { EvaluationSupplier } from 'src/graphql/EvaluationSupplier/evaluantionSupplier.model';

export default function handleAvarage(evaluations: EvaluationSupplier[]) {
  const sum = evaluations.reduce((acc, evaluation) => acc + evaluation.note, 0);
  return sum / evaluations.length;
}
