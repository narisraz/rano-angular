
export class Consommation {
  id!: string
  abonneeId!: string
  volume!: number
  statementDate!: Date
  amountPaid: number = 0
  amountToPay!:number
}
