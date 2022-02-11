import {Address} from "./Address";

export class Abonnee {
  id!: String
  siteId!: String
  reservoirId!: String
  address!: Address
  name!: String
  contractDate!: String
  firstName?: String
  telephones?: Array<number>
}
