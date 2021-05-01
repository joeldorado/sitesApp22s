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
export class AffiliatesService {
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
    if (this.path === 'affiliates') {
        this.path = '';
    }

    if (+this.affilPath[0]) {
     this.affiliate = this.affilPath[0];
   }
  }



  public getSignUpData(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-affiliate-data`, {});
  }

  public accountExistVal(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-affiliate-account-validation?token=${this.tkn.get()}&path=${this.path}`, {
      params: new HttpParams().set('email', email)
    });

  }

  public affiliateAccess(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-access-validation?token=${this.tkn.get()}`, {
      params: new HttpParams().set('path', this.path)
    });
  }

  public registerAffiliate(mail: string): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-add-aff-access?token=${this.tkn.get()}`, {
      path: this.path,
      email: mail
    });
  }

  public getMemberData(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/site-affiliate-member-data?token=${this.tkn.get()}`, {
      params: new HttpParams().set('path', this.path)
    });
  }
  public getAffLinksData(): Observable<any>  {
    return this.httpClient.get(`${this.apiHost}api/site-affiliate-links-data?token=${this.tkn.get()}`, {
      params: new HttpParams().set('path', this.path)
    });
  }
}
