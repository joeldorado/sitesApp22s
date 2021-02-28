import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenService} from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MembersAreaService {

  // private headers: HttpHeaders;
  apiHost = 'http://127.0.0.1:8000/';
  constructor(
    private httpClient: HttpClient,
    private tk: TokenService
  ) { }


  /**
   *
   *
   */
  public get_pages(site: string): Observable<any> {
  // get owner id
  // falta enviar  el story id, o se optendra en el back end?

  return this.httpClient.get(`${this.apiHost}api/members-area-block?token=${this.tk}`, {
    params: new HttpParams().set('site_id', site)
  });

  }
  public get_page(site: string, pageNumber: string): Observable<any> {
    // get owner id
    // falta enviar  el story id, o se optendra en el back end?
    return this.httpClient.post(`${this.apiHost}api/ma-get-page`, {
      site_id: site,
       page_number: pageNumber
    });
  }
  public get_home_page(site: string): Observable<any> {
    // get owner id
    // falta enviar  el story id, o se optendra en el back end?
    return this.httpClient.get(`${this.apiHost}api/ma-home-page?token=${this.tk.get()}`, {
      params: new HttpParams().set('site_id', site)
    });
  }
public getMenuPages(site: string): Observable<any> {
  return this.httpClient.get(`${this.apiHost}api/members-area-pages?token=${this.tk.get()}`, {
    params: new HttpParams().set('site_id', site)
  });
}

public validateSiteAccess(): Observable<any> {
  console.log('validate site access:');
  return this.httpClient.get(`${this.apiHost}api/ma-site-access?token=${this.tk.get()}`);
}

}



