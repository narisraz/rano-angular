import {IUseCase} from "../ports/in/IUseCase";
import {Client} from "../entities/Client";
import {Observable, of} from "rxjs";
import {Injectable} from "@angular/core";
import {ClientRepository} from "../ports/out/ClientRepository";

@Injectable({
  providedIn: "root"
})
export class AddClient implements IUseCase<Client, Observable<Client>>{

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(client: Client): Observable<Client> {
    return this.clientRepository.add(client);
  }

}
