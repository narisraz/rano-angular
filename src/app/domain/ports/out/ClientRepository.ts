import {Client} from "../../entities/Client";
import {Observable} from "rxjs";

export abstract class ClientRepository {
  abstract add(client: Client): Observable<Client>
  abstract findByName(name: String): Observable<Client>
  abstract findById(id: String): Observable<Client>
}
