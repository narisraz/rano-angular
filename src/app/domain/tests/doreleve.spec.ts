import {DoReleve} from "../usecases/DoReleve";
import {abonnee1, MockAbonneeRepository} from "./mocks/MockAbonneeRepository";
import {
  consommationAbonnee1Month1,
  consommationAbonnee1Month2,
  MockConsommationRepository
} from "./mocks/MockConsommationRepository";
import {MockPricingRepository} from "./mocks/MockPricingRepository";
import {ReleveRequest} from "../entities/requests/ReleveRequest";
import {MockUpdateAbonneeAcount} from "./mocks/MockUpdateAbonneeAcount";

describe('Do releve', function () {

  let doReleve: DoReleve

  beforeEach(() => {
    doReleve = new DoReleve(
      MockConsommationRepository(),
      MockAbonneeRepository(),
      MockPricingRepository(),
      MockUpdateAbonneeAcount()
    )
  })

  it('should retrun consommation', done => {
    doReleve.execute(new ReleveRequest("1", abonnee1.id, consommationAbonnee1Month1.volume, consommationAbonnee1Month1.statementDate))
      .subscribe(consommation => {
        expect(consommation.amountToPay).toEqual(consommationAbonnee1Month1.amountToPay)
        done()
      })
  });

  it('should retrun consommation given volume with virgule', done => {
    doReleve.execute(new ReleveRequest("1", abonnee1.id, consommationAbonnee1Month2.volume, consommationAbonnee1Month2.statementDate))
      .subscribe(consommation => {
        expect(consommation.amountToPay).toEqual(consommationAbonnee1Month2.amountToPay)
        done()
      })
  });

});
