import {Address} from "./Address";

export class Client {
  constructor(
    id: String,
    name: String,
    email: String,
    address: Address,
    telephones: Array<number>,
    stat: String,
    nif: String,
    communalTax?: number,
    renewalAndExtensionFund?: number
  ) {
  }
}
