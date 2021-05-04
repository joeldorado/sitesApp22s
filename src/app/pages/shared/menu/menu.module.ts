import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MenuComponent} from './menu.component';
import {MaterialComponentsModule} from '../../material-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {MenuRoutingModule} from './menu-routing.module';
@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    MenuRoutingModule
  ], exports: [MenuComponent]
})
export class MenuModule { }
