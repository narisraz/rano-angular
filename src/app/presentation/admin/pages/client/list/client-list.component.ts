import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ListClient} from "../../../../../domain/usecases/base/ListClient";
import {ListClientResponse} from "../../../../../domain/entities/responses/ListClientResponse";
import {TableColumn} from "../../../../models/TableColumn";
import {ClientListViewModel} from "./client-list-view.model";
import {map} from "rxjs/internal/operators";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnDestroy {

  clientListViewModel: ClientListViewModel[] = []
  subscription$: Subscription = new Subscription()
  columns: TableColumn[] = [
    { field: 'name', header: 'Nom' },
    { field: 'stat', header: 'Stat' },
    { field: 'nif', header: 'NIF' },
    { field: 'telephones', header: 'Téléphones' },
    { field: 'region', header: 'Région' },
    { field: 'commune', header: 'Commune' },
    { field: 'fokontany', header: 'Fokontany' },
    { field: 'lot', header: 'Lot' },
  ]
  selectedColumns: TableColumn[] = this.columns
    .filter(column => ['name', 'telephones', 'region', 'commune'].includes(column.field))

  constructor(
    private listClient: ListClient
  ) { }

  loadClients() {
    this.subscription$ = this.listClient.run()
      .pipe(map(this.toViewModel))
      .subscribe(value => this.clientListViewModel = value)
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  private toViewModel(listClientResponses: ListClientResponse[]): ClientListViewModel[] {
    return listClientResponses
      .map(value => new ClientListViewModel(
        value.name,
        value.stat,
        value.nif,
        value.telephones,
        value.address.region ?? '',
        value.address.commune ?? '',
        value.address.fokontany ?? '',
        value.address.lot ?? ''
      ))
  }
}
