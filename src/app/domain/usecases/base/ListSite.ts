import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Observable} from "rxjs";
import {Site} from "../../entities/Site";
import {Injectable} from "@angular/core";
import {SiteRepository} from "../../ports/out/SiteRepository";

@Injectable({
  providedIn: "root"
})
export class ListSite implements UseCaseFunction<String, Observable<Array<Site>>> {

  constructor(
    private siteRepository: SiteRepository
  ) {
  }

  execute(cliendId: String): Observable<Array<Site>> {
    return this.siteRepository.getAllSitesByClientId(cliendId)
  }

}
