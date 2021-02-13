import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPageComponent } from './sales-page.component';
import {SalesPageRoutignModule} from './sales-page-routign.module';


@NgModule({
  declarations: [SalesPageComponent],
  imports: [
    CommonModule,
    SalesPageRoutignModule
  ],
  exports: [SalesPageComponent]
})
export class SalesPageModule { }
