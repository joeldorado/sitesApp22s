import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MembersAreaComponent} from './members-area.component';

const routes: Routes = [
  {
    path: '',
    component: MembersAreaComponent,
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
export class MembersAreaRoutignModule { }

