import {IUseCase} from "../ports/in/IUseCase";
import {Consommation} from "../entities/Consommation";
import {Builder} from "builder-pattern";
import {ReleveRequest} from "../entities/requests/ReleveRequest";
import {ConsommationRepository} from "../ports/out/ConsommationRepository";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {AbonneeRepository} from "../ports/out/AbonneeRepository";
import {isEmpty, tap} from "rxjs/operators";
import {flatMap} from "rxjs/internal/operators";
import {PricingRepository} from "../ports/out/PricingRepository";
import {UpdateAbonneeAccount} from "./UpdateAbonneeAccount";
import {UpdateAbonneeAccountRequest} from "../entities/requests/UpdateAbonneeAccountRequest";

@Injectable({
  providedIn: "root"
})
export class DoReleve implements IUseCase<ReleveRequest, Observable<Consommation>>{

  constructor(
    private consommationRepository: ConsommationRepository,
    private abonneeRepository: AbonneeRepository,
    private pricingRepository: PricingRepository,
    private updateAbonneAccount: UpdateAbonneeAccount
  ) {
  }

  execute(releveRequest: ReleveRequest): Observable<Consommation> {
    return this.abonneeRepository.findById(releveRequest.abonneeId)
      .pipe(
        isEmpty(),
        flatMap(abonneeNotFound => abonneeNotFound ? throwError("Abonnee not found") : this.saveConsommation(releveRequest)),
        tap(consommation => {
          this.updateAbonneAccount.execute(new UpdateAbonneeAccountRequest(consommation.abonneeId, -consommation.amountToPay))
        })
      )
  }

  private saveConsommation(releveRequest: ReleveRequest): Observable<Consommation> {
    return this.pricingRepository.getPrice(releveRequest.clientId, releveRequest.volume)
      .pipe(
        tap(pricing => {
          if (!pricing)
            throwError(`Pricing not found for volume ${releveRequest.volume} with clientId ${releveRequest.clientId}`)
        }),
        flatMap(pricing => this.consommationRepository.add(Builder(Consommation)
          .abonneeId(releveRequest.abonneeId)
          .volume(releveRequest.volume)
          .statementDate(releveRequest.date)
          .amountToPay(releveRequest.volume * pricing!.price)
          .build()))
      )
  }
}
