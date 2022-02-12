import {Address} from "./Address";

export class Client {
  id!: string
  name!: string
  stat!: string
  nif!: string
  address!: Address
  email?: string
  telephones?: Array<number>
  communalTax?: number
  renewalAndExtensionFund?: number
}
