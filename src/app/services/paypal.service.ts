import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import {TokenService} from './token.service';
@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  apiHost = '';
  path = location.pathname.split('/')[1];
  constructor(
  @Inject(DOCUMENT)
  private document: Document,
  private httpClient: HttpClient,
  private appserv: AppConfigService,
  private tkn: TokenService) {
    this.apiHost = this.appserv.getApiHost();
    if (this.path === 'signupform') {
      this.path = '';
    }
   }
  public initiate(clientId: string, currency: string): Observable<void> {
    const paypalScriptElement: HTMLScriptElement = this.document.createElement('script');
    paypalScriptElement.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    paypalScriptElement.id = 'paypal-script';

    this.document.head.appendChild(paypalScriptElement);

    return fromEvent<void>(paypalScriptElement, 'load').pipe(first());
  }

  public remove(): void {
    const paypalScriptElement: any  = this.document.getElementById('paypal-script');

    this.document.head.removeChild(paypalScriptElement);
  }

  public saveTransaction(paymentData: any, Order: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-paypal-transaction?token=${this.tkn.get()}`,
    {path: this.path,
        paymentType: paymentData.payment_type,
        orderId: Order.id,
        amount: Order.purchase_units[0].amount.value,
        currency: Order.purchase_units[0].amount.currency_code,
        status: Order.status,
        buyedDate : Order.create_time
      });

  }
}


