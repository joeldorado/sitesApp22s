import { Component, OnInit } from '@angular/core';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {BillingService} from '../../services/billing.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
export interface Billing {
  date: string;
  amount: string;
  type: string;
  site: string;
}


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  menuTitle: any = 'Billing';
  isAuthenticated: any;
  displayedColumns: string[] = ['date', 'amount', 'type', 'site'];
  subsc: Billing[] = [];
  trans: Billing[] = [];
  subDataSource; // = this.subsc;
  tranDataSource;
  siteStyles: any;
  billingData!: any;
  transSiteSecected: any;
  constructor(
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private auth: AuthService,
    private billingServ: BillingService,
    private loc: Location
  ) {
    this.isAuth.authStatus.subscribe((value) => {
      this.isAuthenticated = value;
      if (!value) {
        // seria que el papa valide de nuevo y lo rediriga en teoria esta funcion no deveria entrar
        // ya que el papa siempre deve de validar y redirigir
        return;
      }
      this.loadBody();
    });

   }

  loadBody(): void{
    this.billingServ.getBillingData().subscribe(data => {
      console.log(data);
      this.billingData = data;
      this.siteStyles = data.style;
      console.log(this.siteStyles);
      this.menuTitle = data.business_name;
      // set data source for table subscriptions
      data.subscriptions.forEach(element => {
          const r = {
            date: element.created_at,
            amount: '$' + element.amount + ' ' + element.currency,
            type: element.recurring_cycle,
            site: element.site_name
          };
          this.subsc.push(r);
      });
      console.log(this.subsc);
      this.subDataSource = this.subsc;
  // set data source for table transactions
      data.transactions.forEach(trans => {
        const tr = {
          date: trans.created_at,
          amount: '$' + trans.amount + ' ' + trans.currency,
          type: trans.transaction_type,
          site: trans.site_name
        };
        this.trans.push(tr);
      });
      this.tranDataSource = new MatTableDataSource(this.trans);
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    if (this.tranDataSource === undefined) {
      return;
    }
    this.tranDataSource.filterPredicate =  (data, filter) => {
      return data.site.toLowerCase().includes(filter);
    };
  }

  transSiteFilter(): void {
  this.tranDataSource.filter = this.transSiteSecected.toLocaleLowerCase();
  }


}
