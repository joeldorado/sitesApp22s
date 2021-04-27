import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {AuthService} from '../../services/auth.service';
import {AffiliatesService} from '../../services/affiliates.service';
import {SignUpComponent} from './sign-up/sign-up.component';
import {MembersComponent} from './members/members.component';
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
  constructor(
    private resolver: ComponentFactoryResolver,
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private auth: AuthService,
    private affServ: AffiliatesService
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

   public loadPage(): void{
    this.affServ.getSignUpData().subscribe(data => {
      console.log(data);
      this.signUpData$ = data;
      this.sitesStyles$ = JSON.parse(data.style);
      this.loadBody();
    });
   }

   public loadBody(): void{
    let component: any = SignUpComponent;
    if (this.isAuthenticated) {
      component = MembersComponent;
    }

    const Factory = this.resolver.resolveComponentFactory(component);
    const Ref: ComponentRef<any>  = this.body.createComponent(Factory);
    Ref.instance.value =  this.signUpData$;
    Ref.instance.siteStyles = this.sitesStyles$;

   }

  ngOnInit(): void {

  }

}
