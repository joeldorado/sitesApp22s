import { Component} from '@angular/core';
import {SalesPageService} from '../../services/sales-page.service';
import {Router} from '@angular/router';
import { IsAuthService } from '../../services/is-auth.service';
@Component({
  selector: 'app-sales-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.scss']
})
export class SalesPageComponent  {
menuData$: any;
structure$: any;
blocks$: any;
logedIn = false;
rowBodyMargin: any = {};
path = location.pathname.split('/');
siteStyles: any;
 constructor(
  private sp: SalesPageService,
  private router: Router,
  private isAuth: IsAuthService,
 ) {
  // console.log(
  //   JSON.stringify({
  //         sites_style: {headerFont: 'Open Sans', bodyFont: 'Zen Dots', padding: 1, bodyBackground: '#000'},
  //         rows_style: {
  //             default: {section:
  //               {background: '#fff'}, buttons: {background: '#fff', color: '#000'}, text: {header: {color: '#000'}, body:
  //                {color: '#000'}}},
  //             highlight: {section:
  //               {background: '#1a73e8'}, buttons: {background: '#fff', color: '#000'}, text: {header: {color: '#000'}, body:
  //                {color: '#000'}}},
  //             otherone: {section:
  //               {background: '#d93025'}, buttons: {background: '#fff', color: '#000'}, text: {header: {color: '#000'},
  //                body: {color: '#000'}}},
  //             othertwo: {section:
  //               {background: '#dadce0'}, buttons: {background: '#fff', color: '#000'},
  //               text: {header: {color: '#000'}, body: {color: '#000'}}}
  //         }
  //     })

  // );
// valida si ya esta loged in enviar al members area que le corresponde
  this.isAuth.authStatus.subscribe((value) => {
    if (value) {
      this.logedIn = true;
      let sendTo = this.path[1] + '/members';
      if (this.path[1] === 'start') {
        sendTo = 'members';
    }
     // this.router.navigate([sendTo]);
     // validate if have accees if not send to members area
    }
  });

  // carga los datos
  this.sp.get_sales_pages().subscribe(data => {
    // si no tiene acceso no se econtro sitio enviar a 404
    if (data.error !== undefined) { this.router.navigate(['/404', {msg : data.error}]); return; }
   // console.log(data);
    this.structure$ = JSON.parse(data.structure.structure_json);
   // console.log(data.style);
    this.siteStyles = JSON.parse(data.style);
    console.log(this.siteStyles);
    document.body.style.backgroundColor = this.siteStyles.sites_style.bodyBackground;
    if (!this.siteStyles.sites_style.padding) {
      this.rowBodyMargin = {margin: '0px !important', border: 'none !important', 'border-radius': '0px !important'};
    }
    this.blocks$ = data.body;
    this.menuData$ = {
      business : data.business_name,
      site: data.site_name
    };

  });


 }



}
