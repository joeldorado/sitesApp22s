import { Component, ComponentFactoryResolver, ViewChildren,
  ViewContainerRef, QueryList, AfterViewInit, ComponentRef,  Input, OnChanges, ViewChild} from '@angular/core';
import {SalesPageService} from '../../services/sales-page.service';
@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent  {
menuData$: any;
structure$: any;
blocks$: any;
 constructor(
  private sp: SalesPageService,
 ) {
  this.sp.get_sales_pages().subscribe(data => {
    if (data.error !== undefined) {
      alert(data.error);
    }

    this.structure$ = JSON.parse(data.structure.structure_json);
    this.blocks$ = data.body;
    this.menuData$ = {
      business : data.business_name,
      site: data.site_name
    };

  });
 }
}
