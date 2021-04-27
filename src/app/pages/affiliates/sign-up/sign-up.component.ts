import { Component, OnInit, Input,
   ViewChildren, ComponentFactoryResolver,
   ComponentRef,
   ViewContainerRef, QueryList, OnChanges } from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {TextComponent} from '../../shared/text/text.component';
import {ImageComponent} from '../../shared/image/image.component';
import {CountdownTimerComponent} from '../../shared/countdown-timer/countdown-timer.component';
import {VideoComponent} from '../../shared/video/video.component';
import {AffiliatesService} from '../../../services/affiliates.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnChanges {
@Input() value: any;
@Input() siteStyles: any;
bodyFont: any;
email = '';
@ViewChildren('previewComponents', {read: ViewContainerRef}) previewComponents!: QueryList<ViewContainerRef>;
  constructor(
    private resolver: ComponentFactoryResolver,
    private affServ: AffiliatesService,
  ) {

    // espera a que cargue el dom de la estructura
    setTimeout(() => {
      this.value.row.forEach(element => {
        console.log(this.siteStyles.rows_style.default.text.body);
        this.bodyFont = this.siteStyles.rows_style.default.text.body; // { 'font-family': this.siteStyles.sites_style.bodyFont};
        this.drawComponent(element);
      });
    }, 1000);
  }

  ngOnChanges(): void {

  }

  /**
   *
   * @param blockData
   * @desc toma y crea el componente dependiendo su tipo
   */
  drawComponent(blockData): any {
    console.log(blockData);
    if (blockData === undefined) { return; }
    if (this.previewComponents.length === 0) { return; }
    if (blockData.block_type === 'empty') {
      return true;
    }
    const elem: ViewContainerRef[]  =  this.previewComponents.filter((element, index) => index === blockData.block_number);
    const componentType = blockData.block_type;
    const value = JSON.parse(blockData.data_json);
    let component;

    if (componentType === 'button') {
        component = ButtonComponent;
    } else if (componentType === 'img') {
      component = ImageComponent;
    } else if (componentType === 'txt') {
      component = TextComponent;
    } else if (componentType === 'video') {
      component = VideoComponent;
    } else if (componentType === 'Countdown') {
      component = CountdownTimerComponent;
    }

    const Factory = this.resolver.resolveComponentFactory(component);
    const Ref: ComponentRef<any>  = elem[0].createComponent(Factory);
    Ref.instance.value = value;
    // ids pos 0 is fore row value, column value 1 and blick 2
    Ref.instance.blockPosition = blockData.block_number;

    this.siteStyles.rows_style.default.text.body['font-family'] = this.siteStyles.sites_style.bodyFont;
    this.siteStyles.rows_style.default.buttons['font-family'] = this.siteStyles.sites_style.bodyFont;
    Ref.instance.siteStyle = this.siteStyles.rows_style.default;
  }
  // ON FOCUS OUT EMAIL VALIDATION
  onFocusOutEvent($event: any): void {
    if (this.email === '') { return; }

    this.affServ.accountExistVal(this.email).subscribe(data => {
      console.log(data);
    });


  }

}
