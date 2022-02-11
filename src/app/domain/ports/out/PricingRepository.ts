import {Pricing} from "../../entities/Pricing";
import {Observable} from "rxjs";

export abstract class PricingRepository {
  abstract add(pricing: Pricing): Observable<Pricing>
  abstract getPrice(clientId: String, volume: number): Observable<Pricing | undefined>
  abstract getAllByClientId(clientId: String): Observable<Array<Pricing>>
}
