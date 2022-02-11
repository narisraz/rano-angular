import {Consommation} from "../../entities/Consommation";
import {Observable} from "rxjs";

export abstract class ConsommationRepository {
  abstract add(consommation: Consommation): Observable<Consommation>
  abstract updateAmountPaidById(id: String, amountPaid: number): Observable<Consommation>
  abstract getLatestConsommationsByAbonneeId(abonneeId: String, date: Date): Observable<Array<Consommation>>
  abstract getNotBilledConsommations(abonneeId: String): Observable<Array<Consommation>>
}
