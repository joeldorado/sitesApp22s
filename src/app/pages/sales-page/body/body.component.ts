import { Component, ComponentFactoryResolver, ViewChildren,
  ViewContainerRef, QueryList, AfterViewInit, ComponentRef,  Input, OnChanges, ViewChild} from '@angular/core';

import {ImageComponent} from '../../shared/image/image.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {TextComponent} from '../../shared/text/text.component';
import {CountdownTimerComponent} from '../../shared/countdown-timer/countdown-timer.component';
import {VideoComponent} from '../../shared/video/video.component';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnChanges{
  @Input() structure: any;
  @Input() blocks: any;
  @Input() siteStyle: any;
  @Input() rowPadding: any;
  @ViewChildren('blockComponent', { read: ViewContainerRef })
  blockComponent!: QueryList<ViewContainerRef>;

  businessName = 'Business Name...';
  siteName = 'Site Name...';
 constructor(

   private resolver: ComponentFactoryResolver,
   ) {

 }

  ngOnChanges(): void {
     setTimeout(() => {
      this.getComponentData();
     }, 1000);
  }

 rowStyle(rowBody, padding): any {
  return Object.assign(rowBody, padding);
 }

 getComponentData(): void {

   if (this.blockComponent === undefined || this.blockComponent.length === 0 || this.blocks === undefined) { return; }
   this.blockComponent.forEach((blockComp, index) => {
     if (blockComp.length > 0) { blockComp.detach(); }
     // first index is fore row, second column and tird block values positions
     const ids = blockComp.element.nativeElement.id.split('');
     const blockData = this.blocks.filter((b: any) => b.row_number.toString() === ids[0] &&
                                             b.column_number.toString() === ids[1] &&
                                             b.block_number.toString() === ids[2]
                                             )[0];
     // console.log(blockData);
     this.drawComponent(index, ids, blockData);
    });
 }

 logIn(): void {
   localStorage.setItem('logedIn', 'yes');
   location.reload();
 }

 ifBlockHasComponent(data: any, r: string, c: string , b: string): any {

   if (data === null) { return; }
  /* const block = data.filter(d =>
     d.row_number === r.toString() &&
     d.column_number === c.toString() &&
     b.toString() === d.block_number);
        if (block[0].Block_type === 'empty') {
                                 return false;
   }
     */

   return true;

 }

 /**
  * 
  * @param selected
  * @param ids
  * @param blockData
  * @desc toma y crea el componente dependiendo su tipo
  */
 drawComponent(selected: any, ids: any, blockData: any): void {

   const elem: ViewContainerRef[]  =  this.blockComponent.filter((element, index) => index === selected);
   const componentType = blockData.block_type;
   const value = JSON.parse(blockData.data_json);
   let component: any;

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

   if (component === undefined) { return; }
   const Factory = this.resolver.resolveComponentFactory(component);
   const Ref: ComponentRef<any>  = elem[0].createComponent(Factory);

   Ref.instance.value = value;
   Ref.instance.blockPosition = ids[0] + ',' + ids[1] + ',' + ids[2];

   const preSiteStyles = this.siteStyle.rows_style[this.structure.rows[ids[0]].style];
   preSiteStyles.buttons['font-family'] =  this.siteStyle.sites_style.bodyFont;
   preSiteStyles.text.body['font-family'] = this.siteStyle.sites_style.bodyFont;
   preSiteStyles.text.header['font-family'] = this.siteStyle.sites_style.headerFont;
   Ref.instance.siteStyle = this.siteStyle.rows_style[this.structure.rows[ids[0]].style];
   // console.log(this.structure.rows[ids[0]].style);
   // console.log(this.siteStyle.rows_style[this.structure.rows[ids[0]].style]);

 }

}
