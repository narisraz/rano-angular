export class ReleveRequest {
  constructor(
    public clientId: String,
    public abonneeId: String,
    public volume: number,
    public date: Date
  ) {
  }
}
