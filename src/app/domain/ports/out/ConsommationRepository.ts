import {Consommation} from "../../entities/Consommation";
import {Observable} from "rxjs";

export abstract class ConsommationRepository {
  abstract add(consommation: Consommation): Observable<Consommation>
  abstract updateAmountPaidById(id: string, amountPaid: number): Observable<void>
  abstract getLatestConsommationsByAbonneeId(abonneeId: string, count: number): Observable<Array<Consommation>>
  abstract getNotBilledConsommations(abonneeId: string): Observable<Array<Consommation>>
}
