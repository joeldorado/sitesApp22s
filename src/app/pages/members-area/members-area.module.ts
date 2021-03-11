import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersAreaComponent } from './members-area.component';
import {MembersAreaRoutignModule} from './members-area-routign.module';
import {MaterialComponentsModule} from '../material-components.module';
import {MenuComponent} from './menu/menu.component';
import {BodyComponent} from './body/body.component';
@NgModule({
  declarations: [MembersAreaComponent, MenuComponent, BodyComponent],
  imports: [
    CommonModule,
    MembersAreaRoutignModule,
    MaterialComponentsModule

  ],
  exports: [MembersAreaComponent]
})
export class MembersAreaModule { }
