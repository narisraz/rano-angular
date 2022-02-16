import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AddSite} from "../../../domain/usecases/base/AddSite";
import {Site} from "../../../domain/entities/Site";
import {Observable, of, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {Builder} from "builder-pattern";
import {Address} from "../../../domain/entities/Address";
import {ListSite} from "../../../domain/usecases/base/ListSite";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit, AfterViewInit {

  @Input()
  clientId = ''

  displayedColumns: string[] = ['name', 'region', 'commune', 'telephones'];
  datasource = new MatTableDataSource<Site>()
  sitesSubscription$: Subscription = new Subscription()

  siteForm = this.fb.group({
    name: ['', Validators.required],
    telephones: [''],
    address: this.fb.group({
      region: [''],
      commune: [''],
    })
  })

  constructor(
    private fb: FormBuilder,
    private addSite: AddSite,
    private listSite: ListSite
  ) { }

  ngOnInit(): void {
    this.sitesSubscription$ = this.listSite.execute(this.clientId)
      .subscribe(data => {
        this.datasource.data = data
      })
  }

  ngAfterViewInit(): void {
    this.sitesSubscription$.unsubscribe()
  }

  saveSite() {
    if (this.siteForm.valid) {
      this.addSite.execute(this.buildSiteObject())
        .pipe(
          tap(_ => this.siteForm.reset())
        )
    }
  }

  private buildSiteObject(): Site {
    const address = this.siteForm.get('address')
    return Builder(Site)
      .name(this.siteForm.get('name')?.value)
      .clientId(this.clientId)
      .telephones(this.siteForm.get('telephones')?.value)
      .address({...
        Builder(Address)
          .region(address?.get('region')?.value)
          .commune(address?.get('commune')?.value)
          .build()
      })
      .build();
  }

}
