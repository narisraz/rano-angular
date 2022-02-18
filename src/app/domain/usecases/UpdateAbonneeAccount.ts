import {UseCaseFunction} from "../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {AbonneeAccount} from "../entities/AbonneeAccount";
import {UpdateAbonneeAccountRequest} from "../entities/requests/UpdateAbonneeAccountRequest";
import {Injectable} from "@angular/core";
import {AbonneeAccountRepository} from "../ports/out/AbonneeAccountRepository";
import {flatMap, map} from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class UpdateAbonneeAccount implements UseCaseFunction<UpdateAbonneeAccountRequest, Observable<AbonneeAccount>> {

  constructor(
    private abonneeAccountRepository: AbonneeAccountRepository
  ) {
  }

  execute(updateAbonneeAccountRequest: UpdateAbonneeAccountRequest): Observable<AbonneeAccount> {
    return this.abonneeAccountRepository.getByAbonneeId(updateAbonneeAccountRequest.abonneeId)
      .pipe(
        map(abonneeAccount => abonneeAccount.balance + updateAbonneeAccountRequest.amount),
        flatMap(newBalance =>
          this.abonneeAccountRepository.updateBalance(updateAbonneeAccountRequest.abonneeId, newBalance)
        )
      )
  }

}
