import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {TokenService} from './token.service';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  path = location.pathname.split('/')[1];
  private headers: HttpHeaders;
  apiHost = '';
  affilPath = location.pathname.split('/').slice(-1);
  affiliate = '';
  constructor(
    private httpClient: HttpClient,
    private tkn: TokenService,
    private appserv: AppConfigService
    ) {
    this.apiHost = this.appserv.getApiHost();
    this.headers = new HttpHeaders({
    //  '22-SCIALAPP': this.appConfigService.getAppEnv().apiToken,
    //  Authorization: this.appConfigService.getAppEnv().authorization,
      'Content-Type': 'application/json'
    });

    if (this.path === 'signupform') {
        this.path = '';
    }
  }
// if token has key chargeWithSavedCard then we need the client id in order to chargue with saved card.
  public charge(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/stripe-charge?token=${this.tkn.get()}`,
    {
      path: this.path,
      amount: data.initial_amount,
      currency: data.paymentOptions.stripe.currency,
      stripeClienId: data.stripeClienId,
      stripeToken: data.stripeToken,
      paymentType: data.payment_type,
      processor_settings_id: data.paymentOptions.stripe.processor_settings_id,
      email: data.email});

  }
  // if token has key chargeWithSavedCard then we need the client id in order to chargue with saved card.
  public subscription(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/stripe-subscription?token=${this.tkn.get()}`,
    {
      path: this.path,
      stripe_price_id: data.stripe_price_id,
      stripeClienId: data.stripeClienId,
      stripeToken: data.stripeToken,
      paymentType: data.payment_type,
      processor_settings_id: data.paymentOptions.stripe.processor_settings_id,
      email: data.email,
      currency: data.paymentOptions.stripe.currency,
      amount: data.recurring_amount,
      initialAmount: data.initial_amount,
      recurring_cycle: data.recurring_cycle
    });
  }
  // if token has key chargeWithSavedCard then we need the client id in order to chargue with saved card.
  public installment(data: any): Observable <any> {
    return this.httpClient.post(`${this.apiHost}api/stripe-installment?token=${this.tkn.get()}`,
    {
      path: this.path,
      stripe_price_id: data.stripe_price_id,
      stripeClienId: data.stripeClienId,
      stripeToken: data.stripeToken,
      paymentType: data.payment_type,
      number_of_payments: data.number_of_payments,
      processor_settings_id: data.paymentOptions.stripe.processor_settings_id,
      email: data.email,
      currency: data.paymentOptions.stripe.currency,
      amount: data.recurring_amount,
      initialAmount: data.initial_amount,
      recurring_cycle: data.recurring_cycle
    });
  }
  getStripeClientId(): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-stripe-get-stripe-client?token=${this.tkn.get()}`, { path: this.path});
  }

}


