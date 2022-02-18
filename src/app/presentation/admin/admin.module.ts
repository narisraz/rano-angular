import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ClientNewComponent} from './pages/client/new/client-new.component';
import {ClientListComponent} from './pages/client/list/client-list.component';
import {TableModule} from "primeng/table";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    ClientNewComponent,
    ClientListComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    AdminRoutingModule,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    RippleModule
  ]
})
export class AdminModule { }
