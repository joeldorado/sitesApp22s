import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {MaterialComponentsModule} from '../material-components.module';
import {LoginModule} from '../login/login.module';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
// import {MenuComponent} from './menu/menu.component';
import {BodyComponent} from './body/body.component';
import { RouterModule } from '@angular/router';
import {MenuModule} from '../shared/menu/menu.module';
@NgModule({
  declarations: [DashboardComponent, BodyComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialComponentsModule,
    LoginModule,
    RouterModule,
    MenuModule
  ],
  exports: [DashboardComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    LoginComponent
 ]
})
export class DashboardModule { }
