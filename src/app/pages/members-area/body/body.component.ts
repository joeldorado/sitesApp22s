import { Component, Input, OnChanges, ViewChildren, ViewContainerRef,
  QueryList, ComponentRef, ComponentFactoryResolver, SimpleChange } from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {ImageComponent} from '../../shared/image/image.component';
import {TextComponent} from '../../shared/text/text.component';
import {VideoComponent} from '../../shared/video/video.component';
import {CountdownTimerComponent} from '../../shared/countdown-timer/countdown-timer.component';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements  OnChanges {

@ViewChildren('blockComponent', { read: ViewContainerRef })
blockComponent!: QueryList<ViewContainerRef>;
blobkData!: any;
@Input() blocks!: any;
@Input() pageStructure!: any;

constructor(private resolver: ComponentFactoryResolver) { }


ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    const blocksCh: SimpleChange = changes.blocks;
    if (blocksCh !== undefined && blocksCh.firstChange) { return; }

    this.blockComponent.forEach((blockComp, index) => {
      if (blockComp.length > 0) {
        blockComp.detach();
       }
      // first index is fore row, second column and tird block values positions
      const ids = blockComp.element.nativeElement.id.split('');
      const blockData = this.blocks.filter(
              b => b.row_number.toString() === ids[0] &&
              b.column_number.toString() === ids[1] &&
              b.block_number.toString() === ids[2])[0];

      this.drawComponent(index, blockData);

    });
  }

  /**
   *
   * @param selected
   * @param ids
   * @param blockData
   * @desc toma y crea el componente dependiendo su tipo
   */
  drawComponent(selected, blockData): void {
    const elem: ViewContainerRef[]  =  this.blockComponent.filter((element, index) => index === selected);
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

  }


  ifBlockHasComponent(data: any, r: string, c: string , b: string): boolean {

    if (data === undefined) { return false; }
    const block = data.filter( d =>
      d.row_number === r.toString() &&
      d.column_number === c.toString() &&
      b.toString() === d.block_number);
    console.log(block);
    if (block[0].block_type === 'empty') { return false; }
    return true;
  }
}
