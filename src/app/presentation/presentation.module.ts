import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteComponent } from './pages/site/site.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import { ClientComponent } from '../presentation/pages/client/client.component';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    SiteComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
  ]
})
export class PresentationModule { }
