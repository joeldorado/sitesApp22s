import { Component, ComponentFactoryResolver, ViewChildren,
  ViewContainerRef, QueryList, ComponentRef,  Input, OnChanges} from '@angular/core';
import {SalesPageService} from '../../services/sales-page.service';
@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent implements  OnChanges {

  structure: any;
  blocks: any;
  @ViewChildren('blockComponent', { read: ViewContainerRef }) blockComponent: QueryList<ViewContainerRef>;
  constructor(private sp: SalesPageService) {
    this.sp.get_sales_pages().subscribe(data => {
      if (data.error !== undefined) {
        alert(data.error);
      }
      this.structure = JSON.parse(data.structure.structure_json);
      this.blocks = data.body;
      console.log(this.blocks);
    });
  }


  ngOnChanges(): void {
  //  if (this.blockComponent === undefined || this.blockComponent.length === 0 || this.blocks === null) { return; }

   // this.blockComponent.forEach((blockComp, index) => {
      // first index is fore row, second column and tird block values positions
    //  const ids = blockComp.element.nativeElement.id.split('');
      /*const blockData = this.blocks.filter(b => b.row_number.toString() === ids[0] &&
                                              b.column_number.toString() === ids[1] &&
                                              b.block_number.toString() === ids[2]
                                              )[0];
                                              */
    //  this.drawComponent(index, ids, blockData);
    // });
  }

  logIn(): void {
    localStorage.setItem('logedIn', 'yes');
    location.reload();
  }
  /**
   * 
   * @param selected 
   * @param ids 
   * @param blockData 
   * @desc toma y crea el componente dependiendo su tipo
   */


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

}
