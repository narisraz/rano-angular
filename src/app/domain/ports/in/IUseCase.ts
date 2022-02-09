export interface IUseCase<I, O> {
  execute(i: I): O
}
