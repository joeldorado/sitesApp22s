import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class BuisinessAndSitesIdsService {

  private headers: HttpHeaders;
  apiHost = 'http://127.0.0.1:8000/';
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.headers = new HttpHeaders({
      '22-SCIALAPP': 'jCBI5bHxh9HeBXagiLbm9ln4t0oUrkwioVhxUrofEbWNsu6DKxQfOCBHQVEXwCwR',
      Authorization: 'Basic Z21vcmFuQGJhbmR3aWR0aHguY29tOm9tcmVsbGl1Zw==',
      'Content-Type': 'application/json'
    });

   }
   getBusinessId(subdoman: string): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/business-id`, {keyword: subdoman});
   }

   getSiteBySiteName(businessId: string, siteName: string): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-id-by-name`, {businessid: businessId, keyword: siteName});
   }
   getSiteBySiteBusiness(businessId: string): Observable<any> {
    return this.httpClient.post(`${this.apiHost}api/site-id-by-business`, {businessid: businessId});
   }

}
