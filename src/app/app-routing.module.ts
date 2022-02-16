import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SiteComponent} from "./presentation/pages/site/site.component";
import {ClientComponent} from "./presentation/pages/client/client.component";

const routes: Routes = [
  {
    path: 'clients',
    component: ClientComponent
  },
  {
    path: 'sites',
    component: SiteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
