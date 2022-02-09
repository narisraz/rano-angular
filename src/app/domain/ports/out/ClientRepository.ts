import {Client} from "../../entities/Client";
import {Observable} from "rxjs";

export abstract class ClientRepository {
  abstract add(client: Client): Observable<Client>
}
