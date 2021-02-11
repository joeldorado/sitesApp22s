import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersAreaComponent } from './members-area.component';

import {MembersAreaRoutignModule} from './members-area-routign.module';

@NgModule({
  declarations: [MembersAreaComponent],
  imports: [
    CommonModule,
    MembersAreaRoutignModule,
  ]
})
export class MembersAreaModule { }
