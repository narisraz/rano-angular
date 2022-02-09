import {IUseCase} from "../ports/in/IUseCase";
import {Client} from "../entities/Client";
import {AddClient} from "../usecases/AddClient";
import {Builder} from "builder-pattern";
import {Observable, of} from "rxjs";
import {filter} from "rxjs/operators";
import {ClientRepository} from "../ports/out/ClientRepository";

describe("AddClient tests", () => {

  let siran: Client = Builder(Client)
    .id("1")
    .name("Siran")
    .build();
  let clientRepository: ClientRepository;

  beforeEach(() => {
    clientRepository = MockClientRepository()
  })

  it('should return id given a client object', done => {
    const iAddClient: IUseCase<Client, Observable<Client>> = new AddClient(clientRepository);
    iAddClient.execute(siran)
      .subscribe(client => {
        expect(client.id).toBeDefined()
        done()
      })
  });
})

function MockClientRepository() {
  return new class extends ClientRepository {
    add(client: Client): Observable<Client> {
      return of(Builder(Client).id("1").build());
    }
  };
}
