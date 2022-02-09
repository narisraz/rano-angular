import {Address} from "./Address";

export class Client {
  id!: String
  name!: String
  stat!: String
  nif!: String
  address!: Address
  email?: String
  telephones?: Array<number>
  communalTax?: number
  renewalAndExtensionFund?: number
}
