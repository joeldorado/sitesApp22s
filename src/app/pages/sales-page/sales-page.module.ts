import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPageComponent } from './sales-page.component';
import {SalesPageRoutignModule} from './sales-page-routign.module';
import {MenuComponent} from './menu/menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialComponentsModule} from '../material-components.module';
import {BodyComponent} from './body/body.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SalesPageComponent, MenuComponent, BodyComponent],
  imports: [
    CommonModule,
    SalesPageRoutignModule,
    FlexLayoutModule,
    MaterialComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SalesPageComponent]
})
export class SalesPageModule { }
