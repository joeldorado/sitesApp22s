import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page404RoutingModule } from './page-404-routing.module';
import { NotfoundComponent } from './notfound/notfound.component';
import {MaterialComponentsModule} from '../material-components.module';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    Page404RoutingModule,
    MaterialComponentsModule
  ]
})
export class Page404Module { }
