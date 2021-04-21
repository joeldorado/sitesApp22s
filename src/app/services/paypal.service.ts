import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AppConfigService } from './app-config.service';
import {TokenService} from './token.service';
import { DomSanitizer } from '@angular/platform-browser'
@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  apiHost = '';
  private headers!: HttpHeaders;
  path = location.pathname.split('/')[1];
  constructor(
  @Inject(DOCUMENT)
  private document: Document,
  private httpClient: HttpClient,
  private appserv: AppConfigService,
  private tkn: TokenService,
  private sanitizer: DomSanitizer) {
    this.apiHost = this.appserv.getApiHost();
    if (this.path === 'signupform') {
      this.path = '';
    }
   }
  public initiate(type: string, clientId: string, currency: string): Observable<void> {
    const paypalScriptElement: HTMLScriptElement = this.document.createElement('script');

    paypalScriptElement.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;

    if (type === 'subscription') {
      paypalScriptElement.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
      // ATRrthueOsUMS2vVxiwDT1o3l--AnFPaf3W1tmFCJszat5_HKHGSf1uYREL7FpXQ3YOrGZczMc0FaFMk
     // paypalScriptElement.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&components=buttons&vault=true&intent=subscription`;
     // AVMn2wXzQd460_58Bs1J_Eto6feKjrOHMYWPUAhtnSh0lCQfrE9XHIdFJA_QtLDBwgS54l6Ge4ncLf6Y
     // AYZiExMksLKBJQPRSRtPJx_VUVEffQZTA3NkqWSAkMBMNOv6o0YHmgCBKrdbfiHLTAFfhuMgH8T2jvxv
     // ATRrthueOsUMS2vVxiwDT1o3l--AnFPaf3W1tmFCJszat5_HKHGSf1uYREL7FpXQ3YOrGZczMc0FaFMk

     // doradojoel //#endregion
     //ARLgj0D_duq4esbEQhM9Erd4Nj4e_xJvSblwa3ZYyuutwty8SuoXLyhcndL4BDrnQc1ZYg09aSqCxiGY
    }

   // console.log(paypalScriptElement.src);
    paypalScriptElement.id = 'paypal-script';
    paypalScriptElement.setAttribute('data-sdk-integration-source', 'button-factory');
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

  public createAgreement(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/create-agreement?token=${this.tkn.get()}`,
    { path: this.path,
      plan: data.paypal_plan_id,
      initial_amount: data.initial_amount,
      payment_type: data.payment_type,
      processor_settings_id: data.paymentOptions.paypal.processor_settings_id
    });
  }

  public getPaypalAccessToken(base64: any): Observable<any> {
    this.headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic ' + base64});
    const body = 'grant_type=client_credentials';
    return this.httpClient.post<any>(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, body, { headers: this.headers});

  }

  public getSubscription(token: any, subID: any): Observable<any> {
    this.headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: `Bearer ${token}`});
// A21AALlUHImo6gnhAH-xTpn04XHibu0XPfsNJhFxGvZ1UiZwHfITairCJT1evhLBwk18KdFDfHfzay-rFPKOIy1KpxLfi_5mQ
    return this.httpClient.get(`https://api-m.sandbox.paypal.com/v1/billing/subscriptions/${subID}`, { headers: this.headers});

  }

  saveSubscrition(subData, paypalData): Observable<any> {

    let sendCurrency!: string;
    let sendAmount!: string;
    let sendEnrrollDate!: string;

    if (subData.billing_info.last_payment) {
      sendAmount =  subData.billing_info.last_payment.amount.value;
      sendCurrency = subData.billing_info.last_payment.amount.currency_code;
      sendEnrrollDate = subData.billing_info.last_payment.time;
    } else {
        sendAmount =  subData.billing_info.outstanding_balance.value;
        sendCurrency = subData.billing_info.outstanding_balance.currency_code;
        sendEnrrollDate = subData.create_time;
    }

    // outstanding_balance
    // subData.billing_info.last_payment
    return this.httpClient.post(`${this.apiHost}api/site-paypal-save-subscrion?token=${this.tkn.get()}`,
    {path: this.path,
      processor_settings_id: paypalData.paymentOptions.paypal.processor_settings_id,
      sub_id: subData.id,
      payment_type: paypalData.payment_type,
      status: subData.status,
      currency: sendCurrency, // subData.billing_info.last_payment.amount.currency_code,
      amount: sendAmount, // subData.billing_info.last_payment.amount.value,
      next_charge: subData.billing_info.next_billing_time, // .toISOString().replace('.000Z', '').replace('.000T', ''),
      enrollment_date: sendEnrrollDate
      // subData.billing_info.last_payment.time // ).toISOString().replace('.000Z', '').replace('.000T', '')
      });
  }


  encodeBase(data): any {
    return window.btoa(data.clientId + ':' + data.clientSecret);
  }

}


