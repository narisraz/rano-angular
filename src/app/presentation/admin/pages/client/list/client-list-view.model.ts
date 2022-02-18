export class ClientListViewModel {
  constructor(
    readonly name: string,
    readonly stat: string,
    readonly nif: string,
    readonly telephones: string,
    readonly region: string,
    readonly commune: string,
    readonly fokontany: string,
    readonly lot: string
  ) {
  }
}
