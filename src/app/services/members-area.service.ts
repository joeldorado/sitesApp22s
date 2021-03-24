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
export class MembersAreaService {
  path = location.pathname.split('/')[1];
  // private headers: HttpHeaders;
   apiHost = '';
  constructor(
    private httpClient: HttpClient,
    private tk: TokenService,
    private appserv: AppConfigService
    ) {
    this.apiHost = this.appserv.getApiHost();
    if (this.path === 'members') {
      this.path = '';
  }
   }


  /**
   *
   *
   */
  public get_pages(): Observable<any> {
  // get owner id
  // falta enviar  el story id, o se optendra en el back end?

  return this.httpClient.get(`${this.apiHost}api/site-ma-block?token=${this.tk.get()}`, {
    params: new HttpParams().set('path', this.path)
  });

  }
  public get_page(pageNumber: string): Observable<any> {
    // get owner id
    // falta enviar  el story id, o se optendra en el back end?
    return this.httpClient.post(`${this.apiHost}api/ma-get-page?token=${this.tk.get()}`, {
      page_number: pageNumber, path: this.path
    });
  }
  public get_home_page(site: string): Observable<any> {
    // get owner id
    // falta enviar  el story id, o se optendra en el back end?
    return this.httpClient.get(`${this.apiHost}api/ma-home-page?token=${this.tk.get()}`, {
      params: new HttpParams().set('site_id', site)
    });
  }
public getMenuPages(): Observable<any> {
  return this.httpClient.get(`${this.apiHost}api/site-ma-menu?token=${this.tk.get()}`, {
    params: new HttpParams().set('path', this.path)
  });
}

public validateSiteAccess(): Observable<any> {
  console.log('validate site access:');
  return this.httpClient.get(`${this.apiHost}api/ma-site-access?token=${this.tk.get()}`,{
    params: new HttpParams().set('path', this.path)
  });
}

}



