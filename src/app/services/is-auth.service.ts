import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class IsAuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean): any {
    this.loggedIn.next(value);
  }

  constructor(private Token: TokenService) { }
}
