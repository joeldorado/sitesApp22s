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
export class AccountService {

  path = location.pathname.split('/')[1];
  private headers: HttpHeaders;
  apiHost = '';
  affilPath = location.pathname.split('/').slice(-1);

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
    if (this.path === 'account') {
        this.path = '';
    }
  }

  public accountData(): Observable<any> {
    console.log('service');
    return this.httpClient.get(`${this.apiHost}api/site-account-data?token=${this.tkn.get()}`, {
      params: new HttpParams().set('path', this.path)
    });
  }
  public siteSaveUserInfo(data: any): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-update-user-info?token=${this.tkn.get()}`,
    data);

  }
  public updatePassword(data): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-update-pass?token=${this.tkn.get()}`,
    data);
  }
}
