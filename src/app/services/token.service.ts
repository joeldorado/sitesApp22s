import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  apiHost = 'http://127.0.0.1:8000/';
  constructor() { }

  private iss = {
    login: `${this.apiHost}api/login`,
    signup: `${this.apiHost}api/signup`
  };

  handle(token: any): void {
    this.set(token);
  }

  set(token: any): void {
    localStorage.setItem('__site_access', token.access_token);
    localStorage.setItem('__site_name_', token.user);
    localStorage.setItem('__site_email_', token.email);
    localStorage.setItem('__site_userType_', token.email === 'admin@22s.com' ? 'user' : 'client');
    // save business_id
  }
  get(): any {
    return localStorage.getItem('__site_access');
  }

  remove(): void {
    localStorage.removeItem('__site_access');
    localStorage.removeItem('__site_name_');
    localStorage.removeItem('__site_email_');
    localStorage.removeItem('__site_userType_');
  }

  isValid(): any {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token: any): any {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any): any {
    return JSON.parse(atob(payload));
  }

  loggedIn(): any {
    return this.isValid();
  }
}
