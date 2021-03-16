import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {TokenService} from '../../services/token.service';
import {IsAuthService} from '../../services/is-auth.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logIn: FormGroup;
  error = '';
  siteName = 'No site name';
  inputType = 'password';
  visible = false;
  path = location.pathname.split('/');
  redirecTo = 'members';

  constructor(private router: Router,
              private fb: FormBuilder,
              private  authSer: AuthService,
              private Token: TokenService,
              private isAuth: IsAuthService,
              public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.logIn = fb.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.siteName = this.data.menuData.site;

   }
   onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  changeInput(): void {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  onFormSubmit(): void {
    const form = {
      email: this.logIn.value.email,
      password: this.logIn.value.password
    };
    this.authSer.login(form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  handleError(error: any): void {
    this.error = error.error.error;
  }

  handleResponse(data: any): void {
    if (data.access_token === undefined) {
      this.error = data.error; return;
    }
    this.Token.handle(data);
    this.isAuth.changeAuthStatus(true);
    this.redirecTo = this.path[1] + '/members';
    if (this.path[1] === 'start') {
      this.redirecTo = 'members';
    } else if (this.siteName === 'Dashboard') {
      this.redirecTo = 'dashboard';
    }
    this.dialogRef.close();
    this.router.navigateByUrl(this.redirecTo);
  }

}
