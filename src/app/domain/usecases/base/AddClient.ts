import {IUseCase} from "../../ports/in/IUseCase";
import {Client} from "../../entities/Client";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {ClientRepository} from "../../ports/out/ClientRepository";
import {isEmpty} from "rxjs/operators";
import {flatMap} from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class AddClient implements IUseCase<Client, Observable<Client | undefined>>{

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  execute(client: Client): Observable<Client> {
    return this.clientRepository.findByName(client.name)
      .pipe(
        isEmpty(),
        flatMap(isNew => isNew ? this.clientRepository.add(client) : throwError("Client already exists"))
      )
  }

}
