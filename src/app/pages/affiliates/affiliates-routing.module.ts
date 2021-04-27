import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AffiliatesComponent } from './affiliates.component';

const routes: Routes = [
  {
    path: '',
    component: AffiliatesComponent,
    data: {
      scrollDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AffiliatesRoutingModule { }
