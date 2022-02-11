export class InvoiceRequest {
  constructor(
    public abonneeId: String,
    public clientId: String,
    public date: Date
  ) {
  }
}
