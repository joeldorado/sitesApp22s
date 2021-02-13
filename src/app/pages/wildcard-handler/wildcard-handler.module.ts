import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WildcardHandlerComponent } from './wildcard-handler.component';
import {WildcardHandlerRoutignModule} from './wildcard-handler-routign.module';
import {MembersAreaModule} from '../members-area/members-area.module';
import {SalesPageModule} from '../sales-page/sales-page.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {MaterialComponentsModule} from '../material-components.module';
import {LoginModule} from '../login/login.module';
@NgModule({
  declarations: [WildcardHandlerComponent],
  imports: [
    CommonModule,
    WildcardHandlerRoutignModule,
    MembersAreaModule,
    SalesPageModule,
    DashboardModule,
    MaterialComponentsModule,
    LoginModule

  ]
})
export class WildcardHandlerModule { }
