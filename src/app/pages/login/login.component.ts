import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';
import {IsAuthService} from '../../services/is-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logIn: FormGroup;
  error = '';
  visible = false;
  path = location.pathname.split('/');
  redirecTo = 'members';
  constructor(private router: Router,
              private fb: FormBuilder,
              private  authSer: AuthService,
              private Token: TokenService,
              private isAuth: IsAuthService) {
    this.isAuth.authStatus.subscribe((value) => {
      if (value) {
        if (this.path.length > 1 && this.path[1] !== 'login') {
          this.redirecTo = this.path[1] + '/members';
        }
        this.router.navigate([this.redirecTo]);

      }
    });
    this.logIn = fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });


   }

  ngOnInit(): void {
  }
  onFormSubmit(): void {
    const form = {
      email: this.logIn.value.email,
      password: this.logIn.value.password,
      business_id: '1000001'
    };

    this.authSer.login(form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleError(error: any): void {
    this.error = error.error.error;
    alert(this.error);
  }

  handleResponse(data: any): void {
    this.Token.handle(data);
    this.isAuth.changeAuthStatus(true);

    if (this.path.length > 1 && this.path[1] !== 'login') {
      this.redirecTo = this.path[1] + '/members';
    }

    this.router.navigateByUrl(this.redirecTo);
  }

}
