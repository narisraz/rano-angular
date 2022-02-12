export class ReleveRequest {
  constructor(
    public clientId: string,
    public abonneeId: string,
    public volume: number,
    public date: Date
  ) {
  }
}
