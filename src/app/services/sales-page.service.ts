import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenService} from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SalesPageService {

  apiHost = 'http://127.0.0.1:8000/';
  constructor(
    private httpClient: HttpClient,
    private tk: TokenService
  ) { }

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
