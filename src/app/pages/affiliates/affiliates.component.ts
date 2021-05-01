import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {AffiliatesService} from '../../services/affiliates.service';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MembersComponent} from './members/members.component';
import {LinksComponent} from './members/links/links.component';
import {SalesComponent} from './members/sales/sales.component';
import { Location } from '@angular/common';
@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss']
})
export class AffiliatesComponent implements OnInit {
  @ViewChild('body', {read: ViewContainerRef})
  body!: ViewContainerRef;
  isAuthenticated: any;
  signUpData$: any;
  sitesStyles$: any;
  menuTitle: any = 'Affiliate';
  affiliateData: any;
  current = 'resources';
  loadingBody = false;
  constructor(
    private resolver: ComponentFactoryResolver,
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private auth: AuthService,
    private affServ: AffiliatesService,
    private loc: Location
  ) {
        this.isAuth.authStatus.subscribe((value) => {
          this.isAuthenticated = value;
          if (value) {
            // seria que el papa valide de nuevo y lo rediriga en teoria esta funcion no deveria entrar
            // ya que el papa siempre deve de validar y redirigir
            this.router.navigateByUrl('/affiliates');
            return;
          }
        });

        this.loadPage();

   }
   public menuAffRouting(action: string): void {
     if (this.current ===  action) { return; }
     this.current = action;
     this.body.clear();
     console.log(action);
     this.loadBody();
   }
   public loadPage(): void{
    this.affServ.getSignUpData().subscribe(data => {
      console.log(data);
      this.signUpData$ = data;
      this.sitesStyles$ = JSON.parse(data.style);
      this.loadBody();
    });
   }

   public loadBody(): void{
    this.loadingBody = true;
    let component: any = SignUpComponent;
    // change condition for access affiliate business
    // Validate affiliate access
    this.affServ.affiliateAccess().subscribe(data => {
      this.loadingBody = false;
      if (data.account) {

        this.menuTitle = 'Affiliate Program';

        if (this.current === 'resources') {

          component = MembersComponent;

        }else if (this.current === 'links') {

          component = LinksComponent;

        } else if (this.current === 'sales') {

          component = SalesComponent;

        }
        this.loc.go('affiliates/' + this.current);

      }

      const Factory = this.resolver.resolveComponentFactory(component);
      const Ref: ComponentRef<any>  = this.body.createComponent(Factory);

      Ref.instance.value =  this.signUpData$;
      Ref.instance.siteStyles = this.sitesStyles$;
      Ref.instance.logedIn = this.isAuthenticated;
      if (this.menuTitle === 'Affiliate Program' && this.current === 'resources') {
        Ref.instance.affiliateData.subscribe(affiliate => {
          this.affiliateData = affiliate;
        });
      }

    });
   }

  ngOnInit(): void {

  }

}
