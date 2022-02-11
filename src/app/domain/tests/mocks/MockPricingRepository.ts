import {PricingRepository} from "../../ports/out/PricingRepository";
import {Pricing} from "../../entities/Pricing";
import {Observable, of} from "rxjs";
import {Builder} from "builder-pattern";

export const
  client1Pricing0To10: Pricing = Builder(Pricing)
    .clientId("1")
    .price(50)
    .minVolume(0)
    .maxVolume(10)
    .build(),
  client1Pricing10To20: Pricing = Builder(Pricing)
    .clientId("1")
    .price(110)
    .minVolume(10)
    .maxVolume(20)
    .build(),
  client2Pricing0To10: Pricing = Builder(Pricing)
    .clientId("2")
    .price(50)
    .minVolume(0)
    .maxVolume(10)
    .build(),
  client2Pricing10To20: Pricing = Builder(Pricing)
    .clientId("2")
    .price(110)
    .minVolume(10)
    .maxVolume(20)
    .build(),
  pricings: Pricing[] = [client1Pricing0To10, client1Pricing10To20, client2Pricing0To10, client2Pricing10To20]

export function MockPricingRepository(): PricingRepository {
  return new class extends PricingRepository {
    add(pricing: Pricing): Observable<Pricing> {
      switch (pricing.minVolume) {
        case 0: return of(client1Pricing0To10)
        case 10: return of(client1Pricing10To20)
        default: throw new Error(`Unable to add pricing ${pricing}`)
      }
    }

    getAllByClientId(clientId: String): Observable<Array<Pricing>> {
      return of(pricings.filter(pricing => pricing.clientId == clientId))
    }

    getPrice(clientId: String, volume: number): Observable<Pricing | undefined> {
      return of(pricings
        .filter(pricing => pricing.clientId == clientId)
        .find(pricing => {
          const isSupMinValue = volume >= (pricing.minVolume ?? 0)
          const isAboveMaxValue = volume < (pricing.maxVolume ?? Number.MAX_SAFE_INTEGER )
          return isAboveMaxValue && isSupMinValue
        })
      )
    }
  }
}
