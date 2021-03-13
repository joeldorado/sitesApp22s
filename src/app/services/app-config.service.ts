import { Injectable } from '@angular/core';
declare var __22_social_env: string;
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  constructor() { }

  getApiHost(): string {
    return __22_social_env === 'dev' ? 'http://127.0.0.1:8000/' : 'https://api-dot-crypto-haven-111118.appspot.com/' ;
  }
}
