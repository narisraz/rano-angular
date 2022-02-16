import {NgModule} from '@angular/core';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule, USE_EMULATOR as AUTH_EMULATOR} from "@angular/fire/compat/auth";
import {AngularFireFunctionsModule, USE_EMULATOR as FUNCTIONS_EMULATOR} from "@angular/fire/compat/functions";
import {environment} from "../../environments/environment";


@NgModule({
  declarations: [],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule
  ],
  providers: [
    {
      provide: AUTH_EMULATOR,
      useValue: environment.production ? undefined : ['http://localhost:9099'],
    },
    {
      provide: FIRESTORE_EMULATOR,
      useValue: environment.production ? undefined : ['localhost', 8080],
    },
    {
      provide: FUNCTIONS_EMULATOR,
      useValue: environment.production ? undefined : ['http://localhost:5001'],
    },
  ],
})
export class DataModule { }
