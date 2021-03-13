import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersAreaComponent } from './members-area.component';
import {MembersAreaRoutignModule} from './members-area-routign.module';
import {MaterialComponentsModule} from '../material-components.module';
import {MenuComponent} from './menu/menu.component';
import {BodyComponent} from './body/body.component';
import { StringToJsonPipe } from '../../pipes/string-to-json.pipe';
import { UpperCasePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import {RouterPathPipe} from '../../pipes/router-path.pipe';
@NgModule({
  declarations: [RouterPathPipe, StringToJsonPipe, MembersAreaComponent, MenuComponent, BodyComponent],
  imports: [
    CommonModule,
    MembersAreaRoutignModule,
    MaterialComponentsModule

  ],
  exports: [MembersAreaComponent],
  providers: [UpperCasePipe, LowerCasePipe, TitleCasePipe]
})
export class MembersAreaModule { }
