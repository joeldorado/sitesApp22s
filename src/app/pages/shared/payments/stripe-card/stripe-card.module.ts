import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeCardComponent } from './stripe-card.component';
import {MaterialComponentsModule} from '../../../material-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [StripeCardComponent],
   exports: [
    StripeCardComponent
  ],
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FontAwesomeModule
  ]
})
export class StripeCardModule { }
