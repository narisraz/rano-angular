import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Site} from "../../entities/Site";
import {Observable} from "rxjs";
import {SiteRepository} from "../../ports/out/SiteRepository";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: "root"
})
export class AddSite implements UseCaseFunction<Site, Observable<Site>>{

  constructor(
    private siteRepository: SiteRepository
  ) {
  }

  execute(site: Site): Observable<Site> {
    return this.siteRepository.add(site);
  }

}
