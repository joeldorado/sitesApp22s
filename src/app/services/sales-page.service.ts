import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenService} from './token.service';
import { Router } from '@angular/router';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SalesPageService {
   apiHost = '';
   path = location.pathname.split('/')[1];
 
  constructor(
    private httpClient: HttpClient,
    private tk: TokenService,
    private appserv: AppConfigService
    ) {
      this.apiHost = this.appserv.getApiHost();
      if (this.path === 'start') { this.path = ''; }
  }

  /**
   *
   *
   */
  public get_sales_pages(): Observable<any> {

  return this.httpClient.get(`${this.apiHost}api/sales-page?path=${this.path}`);

  }


  /**
   *
   *
   */
  public validate_affiliate(affiliate: string): Observable<any> {

    return this.httpClient.get(`${this.apiHost}api/site-validate-affiliate?path=${this.path}`, {
      params: new HttpParams().set('affiliate', affiliate)
    });
    }
}
