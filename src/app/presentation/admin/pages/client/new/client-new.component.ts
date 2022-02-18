import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AddClient} from "../../../../../domain/usecases/base/AddClient";
import {Builder} from "builder-pattern";
import {Client} from "../../../../../domain/entities/Client";
import {PrimeNGConfig} from "primeng/api";

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.scss']
})
export class ClientNewComponent implements OnInit {

  clientForm = this.fb.group({
    name: ['', Validators.required],
    stat: ['', Validators.required],
    nif: ['', Validators.required],
    telephones: [''],
    address: this.fb.group({
      region: [''],
      commune: [''],
      fokontany: [''],
      lot: ['']
    })
  })

  constructor(
    private fb: FormBuilder,
    private addClient: AddClient,
    private primeConfig: PrimeNGConfig
  ) { }

  ngOnInit(): void {
    this.primeConfig.ripple = true
  }

  save() {
    const client: Client = this.clientForm.value
    this.addClient.execute(client)
  }
}
