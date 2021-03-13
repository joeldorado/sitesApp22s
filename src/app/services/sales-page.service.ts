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
  constructor(
    private httpClient: HttpClient,
    private tk: TokenService,
    private appserv: AppConfigService
    ) {
      this.apiHost = this.appserv.getApiHost(); }

  /**
   *
   *
   */
  public get_sales_pages(): Observable<any> {
  let path = location.pathname.split('/')[1];
  if (path === 'start') { path = ''; }
  return this.httpClient.get(`${this.apiHost}api/sales-page?path=${path}`);

  }
}
