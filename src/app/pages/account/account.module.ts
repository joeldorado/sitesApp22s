import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../material-components.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import {MenuModule} from '../shared/menu/menu.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MenuModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialComponentsModule
  ]
})
export class AccountModule { }
