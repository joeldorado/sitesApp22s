import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../login/login.component';
import {DashboardService} from '../../services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  businessName = '';
  path = location.pathname.split('/');
  redirecTo = 'start';
  isLogedIn = false;
  data: any;
  businessUrl = '';

  constructor(
    private isAuth: IsAuthService,
    private router: Router,
    private dsh: DashboardService,
    public dialog: MatDialog) {
    this.loginValidation();
  }

  loginValidation(): void {
    this.isAuth.authStatus.subscribe((value) => {
      if (value) {
        this.isLogedIn = true;
        this.loadData();
      } else {
        this.openDialog();
      }

    });
  }

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '30%',
      data: {menuData: {site: 'Dashboard'}}
    });
  }

  ngOnInit(): void {

  }
  loadData(): void {
    this.dsh.get_dashboard().subscribe(data => {
      this.businessName = data.business.business_name;
      this.data = data;
      if (data.business.business_domain !== '') {
        this.businessUrl = data.business.business_domain;
      } else {
        // this.businessUrl = data.business.business_keyword + '22s.com';
        this.businessUrl = 'http://localhost:3002'; // cambiar logica para cuando este en prod sea subdomain.22s.com
      }

    });
  }

}
