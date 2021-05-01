import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffiliatesRoutingModule } from './affiliates-routing.module';
import { AffiliatesComponent } from './affiliates.component';
import { MaterialComponentsModule } from '../material-components.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MenuComponent } from './menu/menu.component';
import { MembersComponent } from './members/members.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LinksComponent } from './members/links/links.component';
import { SalesComponent } from './members/sales/sales.component';
@NgModule({
  declarations: [AffiliatesComponent, SignUpComponent, MenuComponent, MembersComponent, LinksComponent, SalesComponent],
  imports: [
    CommonModule,
    AffiliatesRoutingModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AffiliatesModule { }
