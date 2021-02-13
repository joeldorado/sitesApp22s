import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WildcardHandlerComponent} from './wildcard-handler.component';

const routes: Routes = [
  {
    path: '',
    component: WildcardHandlerComponent,
    data: {
      scrollDisabled: true
    }
  }
];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WildcardHandlerRoutignModule { }

