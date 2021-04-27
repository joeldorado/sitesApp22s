import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffiliatesRoutingModule } from './affiliates-routing.module';
import { AffiliatesComponent } from './affiliates.component';
import { MaterialComponentsModule } from '../material-components.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MenuComponent } from './menu/menu.component';
import { MembersComponent } from './members/members.component';

@NgModule({
  declarations: [AffiliatesComponent, SignUpComponent, MenuComponent, MembersComponent],
  imports: [
    CommonModule,
    AffiliatesRoutingModule,
    MaterialComponentsModule
  ]
})
export class AffiliatesModule { }
