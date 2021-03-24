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
export class SignUpFormService {
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

    if (+this.affilPath[0]) {
     this.affiliate = this.affilPath[0];
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
    return this.httpClient.get(`${this.apiHost}api/site-account-validation`, {
      params: new HttpParams().set('email', email)
    });

  }

  public siteValidation(): Observable<any> {
    return this.httpClient.get(`${this.apiHost}api/account-validation?token=${this.tkn.get()}`,
    {params: new HttpParams().set('path', this.path)});

  }

  public siteNewUser(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-new-user`,
    {affiliate: this.affiliate, email: data.email, pws: data.pws, payment: data.payment, path: this.path });

  }


  public newSiteAccess(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-new-site-access?token=${this.tkn.get()}`,
    {path: this.path, payment: data.payment });
  }

  public siteSaveUserInfo(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-save-user-info?token=${this.tkn.get()}`,
    data);

  }
  public sendEmail(data: any): Observable<any>  {

    return this.httpClient.post(`https://www.aweber.com/scripts/addlead.pl?email=doradoaguilusjoel@gmail.com
    &meta_adtracking=custom form&meta_required=email&meta_message=1`,
    {params: new HttpParams().set('listname', 'awlist4313354')} );

    console.log(data);
    return this.httpClient.post(`https://www.aweber.com/scripts/addlead.pl`, {
      listname: 'awlist4313354',
      meta_adtracking: 'custom form',
      meta_message: 1,
      meta_required: 'name, email',
      meta_forward_vars: 0,
      name: 'joel dorado',
      email: data.email
    });
  }

}

