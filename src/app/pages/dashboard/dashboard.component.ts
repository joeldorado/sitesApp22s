import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  path = location.pathname.split('/');
  redirecTo = 'start';
  isLogedIn = false;

  constructor(private isAuth: IsAuthService, private router: Router, public dialog: MatDialog) {

    this.loginValidation();
  }

  loginValidation(): void {
    this.isAuth.authStatus.subscribe((value) => {
      console.log(value);
      if (value) {

        this.isLogedIn = true;
      } else {
        this.openDialog();
      }

    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      data: {menuData: {site: 'Dashboard'}} // buscar busines name con el url path
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      console.log(result);
      // this.animal = result;
    });
  }
  ngOnInit(): void {

  }

}
