import {Observable} from "rxjs";
import {AbonneeAccount} from "../../entities/AbonneeAccount";

export abstract class AbonneeAccountRepository {
  abstract updateBalance(abonneId: String, value: number): Observable<AbonneeAccount>
  abstract getByAbonneeId(abonneeId: String): Observable<AbonneeAccount>
}
