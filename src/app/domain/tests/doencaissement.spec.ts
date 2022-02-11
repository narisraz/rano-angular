import {DoEncaissement} from "../usecases/DoEncaissement";
import {EncaissementRequest} from "../entities/requests/EncaissementRequest";
import {abonnee1, MockAbonneeRepository} from "./mocks/MockAbonneeRepository";
import {consommationAbonnee1Month2, MockConsommationRepository} from "./mocks/MockConsommationRepository";
import {MockUpdateAbonneeAcount} from "./mocks/MockUpdateAbonneeAcount";

describe('Do encaissement', function () {

  let doEncaissement: DoEncaissement

  beforeEach(() => {
    doEncaissement = new DoEncaissement(
      MockAbonneeRepository(),
      MockConsommationRepository(),
      MockUpdateAbonneeAcount()
    )
  })

  it('should return encaissement response given an abonnee account', done => {
    const amount = 2000
    const encaissementRequest = new EncaissementRequest(abonnee1.id, amount)
    doEncaissement.execute(encaissementRequest).subscribe(encaissementResponse => {
      expect(encaissementResponse.consommations
        .find(consommation => consommation.id == consommationAbonnee1Month2.id)?.amountPaid)
        .toEqual(consommationAbonnee1Month2.amountToPay)
      expect(encaissementResponse.abonneeAccount.balance)
        .toEqual(745)
      done()
    })
  });

});
