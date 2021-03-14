import { Component, ComponentFactoryResolver, ViewChildren,
  ViewContainerRef, QueryList, AfterViewInit, ComponentRef,  Input, OnChanges, ViewChild} from '@angular/core';
import {SalesPageService} from '../../services/sales-page.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent  {
menuData$: any;
structure$: any;
blocks$: any;
siteNoAccess: any = '';
 constructor(
  private sp: SalesPageService,
  private router: Router,
  private actRouter: ActivatedRoute
 ) {

  this.siteNoAccess = this.actRouter.snapshot.paramMap.get('noaccess');
  this.sp.get_sales_pages().subscribe(data => {
    if (data.error !== undefined) {
      // console.log('erro alert');
      this.router.navigate(['/404', {msg : data.error}]);
      return;
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
