import {UseCaseFunction} from "../../ports/in/UseCaseFunction";
import {Pricing} from "../../entities/Pricing";
import {Observable} from "rxjs";
import {PricingRepository} from "../../ports/out/PricingRepository";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AddPricing implements UseCaseFunction<Pricing, Observable<Pricing>>{

  constructor(
    private pricingRepository: PricingRepository
  ) {
  }

  execute(value: Pricing): Observable<Pricing> {
    return this.pricingRepository.add(value);
  }

}
