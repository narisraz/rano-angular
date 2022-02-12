import {SiteRepository} from "../../domain/ports/out/SiteRepository";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Injectable} from "@angular/core";
import {Site} from "../../domain/entities/Site";
import {from, identity, Observable, of} from "rxjs";
import {Builder} from "builder-pattern";
import {flatMap} from "rxjs/internal/operators";

@Injectable({
  providedIn: "root"
})
export class SiteFirestoreRepository extends SiteRepository {

  public SITE_COLLECTION = "site"

  constructor(
    private afs: AngularFirestore
  ) {
    super();
  }

  add(site: Site): Observable<Site> {
    const docId = this.afs.createId()
    const siteWidId: Site = Builder(site).id(docId).build()
    return from(
      this.afs.collection(this.SITE_COLLECTION)
        .doc(docId)
        .set(siteWidId)
    )
      .pipe(
        flatMap(_ => of(siteWidId))
      )
  }

  getByAbonneeId(abonneeId: string): Observable<Site> {
    return this.afs.collection<Site>(this.SITE_COLLECTION, ref => ref.where("abonneeId", "==", abonneeId))
      .valueChanges()
      .pipe(
        flatMap(identity)
      )
  }

}
