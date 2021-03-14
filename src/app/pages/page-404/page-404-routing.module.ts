import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotfoundComponent} from './notfound/notfound.component';
const routes: Routes = [
  {
    path: '',
    component: NotfoundComponent,
    data: {
      scrollDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page404RoutingModule { }