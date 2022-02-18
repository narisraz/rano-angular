import {ListClientResponse} from "../../entities/responses/ListClientResponse";
import {Injectable} from "@angular/core";
import {ClientRepository} from "../../ports/out/ClientRepository";
import {UseCaseRunner} from "../../ports/in/UseCaseRunner";
import {map} from "rxjs/internal/operators";
import {Observable} from "rxjs";
import {Client} from "../../entities/Client";

@Injectable({
  providedIn: "root"
})
export class ListClient implements UseCaseRunner<Observable<ListClientResponse[]>> {

  constructor(
    private clientRepository: ClientRepository
  ) {
  }

  run(): Observable<ListClientResponse[]> {
    return this.clientRepository.getAll()
      .pipe(
        map(this.toListClientResponse)
      );
  }

  private toListClientResponse(clients: Client[]): ListClientResponse[] {
    return clients
      .map(client => new ListClientResponse(
        client.name,
        client.stat,
        client.nif,
        client.address,
        client.email ?? '',
        client.telephones ?? ''
      ))
  }
}
