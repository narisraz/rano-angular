import {Address} from "./Address";

export class Site {
  id!: string
  clientId!: string
  telephones?: Array<number>
  address?: Address
}
