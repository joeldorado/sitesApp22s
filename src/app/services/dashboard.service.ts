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
export class DashboardService {

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
    if (this.path === 'dashboard') {
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
  public get_dashboard(): Observable<any> {
    let path = location.pathname.split('/')[1];
    if (path === 'start') { path = ''; }
    return this.httpClient.get(`${this.apiHost}api/site-dashboard-getData?token=${this.tkn.get()}&path=${this.path}`);

    }
}
