import {AbonneeAccountRepository} from "../../domain/ports/out/AbonneeAccountRepository";
import {from, identity, Observable} from "rxjs";
import {AbonneeAccount} from "../../domain/entities/AbonneeAccount";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {flatMap, map} from "rxjs/internal/operators";
import {Builder} from "builder-pattern";

@Injectable({
  providedIn: "root"
})
export class AbonneeAccountFirestoreRepository extends AbonneeAccountRepository {

  public ABONNEE_ACCOUNT_COLLECTION = "abonnee_account"

  constructor(
    private afs: AngularFirestore
  ) {
    super();
  }

  getByAbonneeId(abonneeId: string): Observable<AbonneeAccount> {
    return this.afs.collection<AbonneeAccount>(this.ABONNEE_ACCOUNT_COLLECTION, ref => ref.where("abonneeId", "==", abonneeId))
      .valueChanges()
      .pipe(
        flatMap(identity)
      )
  }

  updateBalance(abonneId: string, value: number): Observable<AbonneeAccount> {
    return this.getByAbonneeId(abonneId)
      .pipe(
        flatMap(abonneeAccount => {
          return from(
            this.afs.collection<AbonneeAccount>(this.ABONNEE_ACCOUNT_COLLECTION)
              .doc(abonneeAccount.id)
              .update({ balance: value })
            ).pipe(
              map(_ => Builder(abonneeAccount).balance(value).build())
            )
        })
      )
  }

}
