import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {TokenService} from './token.service';
import {IsAuthService} from './is-auth.service';
import { Router } from '@angular/router';
import {AppConfigService} from '../services/app-config.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers: HttpHeaders;
    apiHost = '';

  constructor(
    private httpClient: HttpClient,
    private token: TokenService,
    private isAuth: IsAuthService,
    private router: Router,
    private appserv: AppConfigService
  ) {
    this.apiHost = this.appserv.getApiHost();
    this.headers = new HttpHeaders({
      '22-SCIALAPP': 'jCBI5bHxh9HeBXagiLbm9ln4t0oUrkwioVhxUrofEbWNsu6DKxQfOCBHQVEXwCwR',
      Authorization: 'Basic Z21vcmFuQGJhbmR3aWR0aHguY29tOm9tcmVsbGl1Zw==',
      'Content-Type': 'application/json'
    });

   }

  public login(data: any): Observable<any> {

    return this.httpClient.post(`${this.apiHost}api/login`, data);

  }

 logout(): void {
    this.token.remove();
    this.isAuth.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    // send request to api to logout
  }

}
