export interface IUseCase<I, O> {
  execute(value: I): O
}
