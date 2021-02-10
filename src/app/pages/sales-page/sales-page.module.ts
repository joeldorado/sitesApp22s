import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPageComponent } from './sales-page.component';
import {MembersAreaRoutignModule} from './sales-page-routign.module';


@NgModule({
  declarations: [SalesPageComponent],
  imports: [
    CommonModule,
    MembersAreaRoutignModule
  ],
  exports: [SalesPageComponent]
})
export class SalesPageModule { }
