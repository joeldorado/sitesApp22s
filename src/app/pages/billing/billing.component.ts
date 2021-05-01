import { Component, OnInit } from '@angular/core';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {AffiliatesService} from '../../services/affiliates.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  sitesStyles$: any;
  menuTitle: any = 'Billing';
  isAuthenticated: any;
  constructor(
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private auth: AuthService,
    private affServ: AffiliatesService,
    private loc: Location
  ) {
    this.isAuth.authStatus.subscribe((value) => {
      this.isAuthenticated = value;
      if (!value) {
        // seria que el papa valide de nuevo y lo rediriga en teoria esta funcion no deveria entrar
        // ya que el papa siempre deve de validar y redirigir
        return;
      }
    });

   }

  ngOnInit(): void {
  }

}
