import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {TokenService} from './token.service';
@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {
  path = location.pathname.split('/')[1];
  private headers: HttpHeaders;
  apiHost = 'http://127.0.0.1:8000/';

  constructor(
    private httpClient: HttpClient,
    private tkn: TokenService) {
    this.headers = new HttpHeaders({
    //  '22-SCIALAPP': this.appConfigService.getAppEnv().apiToken,
    //  Authorization: this.appConfigService.getAppEnv().authorization,
      'Content-Type': 'application/json'
    });
    if (this.path === 'signupform') {
        this.path = '';
    }

  }


  /**
   * 
   *
   */
  public get_block(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-supf-block`, {
      params: new HttpParams().set('path', this.path)
    });

  }

  public get_paymentsOpts(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-sing-up-paymentsOpts`, {
      params: new HttpParams().set('path', this.path)
    });

  }

  public get_accountInfo(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-sing-up-accountInfo`, {
      params: new HttpParams().set('path', this.path)
    });

  }

  public get_coupones(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-sing-up-coupones`, {
      params: new HttpParams().set('path', this.path)
    });

  }

  public accountExistVal(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/account-validation`, {
      params: new HttpParams().set('email', email)
    });

  }

  public siteValidation(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/account-validation?token=${this.tkn.get()}`,
    {params: new HttpParams().set('path', this.path)});

  }


}

