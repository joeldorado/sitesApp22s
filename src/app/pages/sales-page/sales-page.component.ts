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
path = location.pathname.split('/');
 constructor(
  private sp: SalesPageService,
  private router: Router,
  private isAuth: IsAuthService,
 ) {
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
    console.log(data.structure.site_id);
    this.structure$ = JSON.parse(data.structure.structure_json);
    this.blocks$ = data.body;
    this.menuData$ = {
      business : data.business_name,
      site: data.site_name
    };

  });
 }
}
