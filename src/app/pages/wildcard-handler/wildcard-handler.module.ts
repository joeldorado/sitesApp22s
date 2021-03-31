import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WildcardHandlerComponent } from './wildcard-handler.component';
import {WildcardHandlerRoutignModule} from './wildcard-handler-routign.module';
import {MembersAreaModule} from '../members-area/members-area.module';
import {SalesPageModule} from '../sales-page/sales-page.module';
import {DashboardModule} from '../dashboard/dashboard.module';
import {MaterialComponentsModule} from '../material-components.module';
import {LoginModule} from '../login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {RouterPathPipe} from '../../pipes/router-path.pipe';
// components
import { ImageComponent } from '../shared/image/image.component';
import { ButtonComponent } from '../shared/button/button.component';
import {TextComponent} from '../shared/text/text.component';
import {VideoComponent} from '../shared/video/video.component';
import { SignUpFormsComponent } from '../sign-up-forms/sign-up-forms.component';
import {AweberComponent} from '../shared/crm/auto-responders/aweber/aweber.component';
@NgModule({
  declarations: [WildcardHandlerComponent,
                 ImageComponent,
                 ButtonComponent,
                 TextComponent,
                 VideoComponent,
                 SignUpFormsComponent,
                 AweberComponent],
  imports: [
    CommonModule,
    WildcardHandlerRoutignModule,
    MembersAreaModule,
    SalesPageModule,
    DashboardModule,
    MaterialComponentsModule,
    LoginModule,
    HttpClientModule,
    TranslateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ReactiveFormsModule,
    FormsModule,
    YouTubePlayerModule,
    FontAwesomeModule

  ], providers: [RouterPathPipe]
})
export class WildcardHandlerModule { }
