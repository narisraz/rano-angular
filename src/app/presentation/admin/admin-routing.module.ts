import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientNewComponent} from "./pages/client/new/client-new.component";
import {ClientListComponent} from "./pages/client/list/client-list.component";

const routes: Routes = [
  {
    path: 'client',
    children: [
      {
        path: 'new',
        component: ClientNewComponent
      },
      {
        path: 'list',
        component: ClientListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
