import {Address} from "./Address";

export class Site {
  id!: String
  clientId!: String
  telephones?: Array<number>
  address?: Address
}
