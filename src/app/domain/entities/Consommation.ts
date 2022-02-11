
export class Consommation {
  id!: String
  abonneeId!: String
  volume!: number
  statementDate!: Date
  amountPaid: number = 0
  amountToPay!:number
}
