import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillingRoutingModule } from './billing-routing.module';
import { BillingComponent } from './billing.component';
import { MaterialComponentsModule } from '../material-components.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MenuModule} from '../shared/menu/menu.module';
@NgModule({
  declarations: [BillingComponent],
  imports: [
    CommonModule,
    BillingRoutingModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MenuModule
  ]
})
export class BillingModule { }
