import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { MaterialComponentsModule } from '../material-components.module';
import { MenuComponent } from './menu/menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BillingComponent, MenuComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BillingModule { }
