import {Site} from "../../entities/Site";
import {Observable} from "rxjs";

export abstract class SiteRepository {
  abstract add(site: Site): Observable<Site>
  abstract getByAbonneeId(abonneeId: String): Observable<Site>
}
