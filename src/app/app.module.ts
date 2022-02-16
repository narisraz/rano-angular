import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DomainModule} from "./domain/domain.module";
import {DataModule} from "./data/data.module";
import { PresentationModule } from './presentation/presentation.module';
import {SiteRepository} from "./domain/ports/out/SiteRepository";
import {SiteFirestoreRepository} from "./data/firestore/SiteFirestoreRepository";
import {ClientRepository} from "./domain/ports/out/ClientRepository";
import {ClientFirestoreRepository} from "./data/firestore/ClientFirestoreRepository";
import {PricingRepository} from "./domain/ports/out/PricingRepository";
import {PricingFirestoreRepository} from "./data/firestore/PricingFirestoreRepository";
import {AbonneeRepository} from "./domain/ports/out/AbonneeRepository";
import {AbonneeAccountFirestoreRepository} from "./data/firestore/AbonneeAccountFirestoreRepository";
import {AbonneeAccountRepository} from "./domain/ports/out/AbonneeAccountRepository";
import {ConsommationRepository} from "./domain/ports/out/ConsommationRepository";
import {ConsommationFirestoreRepository} from "./data/firestore/ConsommationFirestoreRepository";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DomainModule,
    DataModule,
    PresentationModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: SiteRepository,
      useClass: SiteFirestoreRepository
    },
    {
      provide: ClientRepository,
      useClass: ClientFirestoreRepository
    },
    {
      provide: PricingRepository,
      useClass: PricingFirestoreRepository
    },
    {
      provide: AbonneeAccountRepository,
      useClass: AbonneeAccountFirestoreRepository
    },
    {
      provide: ConsommationRepository,
      useClass: ConsommationFirestoreRepository
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
