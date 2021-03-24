import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmailSenderComponent} from './email-sender.component';

const routes: Routes = [
  {
    path: '',
    component: EmailSenderComponent,
    data: {
      scrollDisabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailSenderRoutingModule { }
