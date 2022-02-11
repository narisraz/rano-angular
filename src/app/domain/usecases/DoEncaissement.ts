import {IUseCase} from "../ports/in/IUseCase";
import {EncaissementRequest} from "../entities/requests/EncaissementRequest";
import {Injectable} from "@angular/core";
import {AbonneeRepository} from "../ports/out/AbonneeRepository";
import {ConsommationRepository} from "../ports/out/ConsommationRepository";
import {combineLatest, Observable, of} from "rxjs";
import {flatMap} from "rxjs/internal/operators";
import {Consommation} from "../entities/Consommation";
import {EncaissementResponse} from "../entities/responses/EncaissementResponse";
import {tap} from "rxjs/operators";
import {AbonneeAccount} from "../entities/AbonneeAccount";
import {UpdateAbonneeAccount} from "./UpdateAbonneeAccount";
import {UpdateAbonneeAccountRequest} from "../entities/requests/UpdateAbonneeAccountRequest";

@Injectable({
  providedIn: "root"
})
export class DoEncaissement implements IUseCase<EncaissementRequest, Observable<EncaissementResponse>>{

  constructor(
    private abonneeRepository: AbonneeRepository,
    private consommationRepository: ConsommationRepository,
    private updateAbonneAccount: UpdateAbonneeAccount
  ) {
  }

  execute(encaissementRequest: EncaissementRequest): Observable<EncaissementResponse> {
    return combineLatest([
      this.consommationRepository.getNotBilledConsommations(encaissementRequest.abonneeId),
      this.updateAbonneAccount.execute(new UpdateAbonneeAccountRequest(encaissementRequest.abonneeId, encaissementRequest.amount)),
    ]).pipe(
      flatMap(([consommations, abonneeAccount]) => this.buildEncaissementResponse(consommations, abonneeAccount))
    ).pipe(
      tap(encaissementResponse => {
        this.updateAbonneAccount.execute(new UpdateAbonneeAccountRequest(encaissementResponse.abonneeAccount.accountId, encaissementResponse.abonneeAccount.balance))
        encaissementResponse.consommations
          .map(consommation => this.consommationRepository.updateAmountPaidById(consommation.abonneeId, consommation.amountPaid ?? 0))
      })
    )
  }

  private buildEncaissementResponse(consommations: Consommation[], abonneeAccount: AbonneeAccount): Observable<EncaissementResponse> {
    const newAbonneeAccount: AbonneeAccount = {...abonneeAccount}
    const billedConsommations: Consommation[] = []
    consommations
      .filter(consommation => this.filterPayableConsommation(consommation, newAbonneeAccount.balance))
      .forEach(consommation => {
        const newConsommation = {...consommation}
        if (consommation.amountToPay <= newAbonneeAccount.balance) {
          newConsommation.amountPaid = consommation.amountToPay
          newAbonneeAccount.balance -= newConsommation.amountPaid
          billedConsommations.push(newConsommation)
        }
      })
    return of(new EncaissementResponse(
      billedConsommations,
      newAbonneeAccount
    ))
  };

  private filterPayableConsommation(consommation: Consommation, balance: number) {
    return consommation.amountToPay <= balance;
  }
}
