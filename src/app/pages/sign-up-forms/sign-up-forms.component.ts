import { Component, OnInit, ViewChildren, ViewContainerRef, QueryList,
  ComponentFactoryResolver, ComponentRef, OnChanges, ViewChild, ElementRef, ViewChildDecorator, AfterViewInit } from '@angular/core';
import {SignUpFormService} from '../../services/sign-up-form.service';
import {ButtonComponent} from '../shared/button/button.component';
import {TextComponent} from '../shared/text/text.component';
import {ImageComponent} from '../shared/image/image.component';
import {CountdownTimerComponent} from '../shared/countdown-timer/countdown-timer.component';
import {VideoComponent} from '../shared/video/video.component';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';

import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {DomSanitizer} from '@angular/platform-browser';
import { ReturnStatement } from '@angular/compiler';
import {AuthService} from '../../services/auth.service';
import {AweberComponent} from '../shared/crm/auto-responders/aweber/aweber.component';
import { validate } from 'json-schema';

@Component({
  selector: 'app-sign-up-forms',
  templateUrl: './sign-up-forms.component.html',
  styleUrls: ['./sign-up-forms.component.scss']
})
export class SignUpFormsComponent  {
  @ViewChildren('previewComponents', {read: ViewContainerRef}) previewComponents!: QueryList<ViewContainerRef>;
  // @ViewChildren('', {read: ViewContainerRef}) autoresponder!: ViewContainerRef;
  @ViewChild('autoresponder', {read: ViewContainerRef})
   autoresponder!: ViewContainerRef;


  addresses: any[] = [];
  blocks$!: any[];
  accountInfo$!: AccountInfo;
  account!: any;
  InfoUsrEmail = '';
  emailTerms = false;

  password = false;
  cpassword = false;
  isAuthenticated!: boolean;
  favoriteSeason!: string;
  path = location.pathname.split('/')[1];

  emailSignup = true;
  paymentOpt = false;
  processpymt = false;
  accountInfo = false;
  siteOptions$!: any;
  emailDisabledBtn = true;
  viewPhone = true;
  emailForm!: FormGroup;
  userInfoForm!: FormGroup;
  questions: string[] = ['What are you most struggling with?'];
  passMatch = false;
  processor = '';
  progress = false;
  validatonEmailLbl = '';
  LogInerror = '';
  isNewUser = false;
  freeSub = false;
  paymentOptions$: any;
  integrationOptions$: any;


  Token = '';
  Bs = '';
  List = '';

  constructor(
    private supForm: SignUpFormService,
    private resolver: ComponentFactoryResolver,
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
  ) {

    // validate log in and if it is check if is payed user then if it is send them to members area
    this.isAuth.authStatus.subscribe((value) => {
      this.isAuthenticated = value;
      if (value) {
        // if is loged in and if length > 0 the account is alredy subscribed
        this.supForm.siteValidation().subscribe(data => this.hanldeSiteAccess(data));
        // if its free and is already loged in dont show emaillogin

      }
    });

    // # loads blocks site ande intgrations and payment options
    this.supForm.getsiteSignUpFormData().subscribe(data => {
      if (data.error) { console.error(data); alert(data.error); }

      // account questions info
      this.accountInfo$ = JSON.parse(data.user_accountinfo_settings_json);
      for (let i = 0; i <= this.accountInfo$.address; i++) {
        const c = i + 1;
        this.addresses.push({lbl: `Address ${c}`, formControl: 'Address' + c });
        this.userInfoForm.addControl('Address' + c , new FormControl('', [Validators.required]));
      }
      this.blocks$ = data.blocks;
      this.siteOptions$ = data.siteOptions;
      if (this.siteOptions$.signup_type === 'free') {
        this.freeSub = true;
        this.processor = 'free';
      }
      // crm options
      this.paymentOptions$ = data.integrationsOptions.paymentOptions;
      this.integrationOptions$ = data.integrationsOptions;
      // set payment options
      this.setPaymentOptions();
      // payment options
      setTimeout(() => {
        data.blocks.forEach(element => {
          this.drawComponent(element);
        });
      }, 1000);
    });

    this.startForms();
   } // end constructor

   setPaymentOptions(): void  {

    if (this.paymentOptions$.type === 'stripe') {
      this.setStripePayments();
    }

   }
   setStripePayments(): void {
   // if (!this.stripeScriptTag.StripeInstance) {
    //   this.stripeScriptTag.setPublishableKey(this.paymentOptions$.public.publishable_key);
     //  console.log('instanse', this.stripeScriptTag.StripeInstance);
    // }

   }
  // HANLDE SITE ACCESS (check if the user already have acces to this site)
   hanldeSiteAccess(data: any): boolean {

      if (data.length > 0) {
        let redirecTo = this.path + '/members';
        if (this.path === 'signupform') {
          redirecTo = 'members';
        }

        this.router.navigate(['/' + redirecTo]);
        return true;
      }
      return false;


   }
  // EMAIL FORM SUBMIT
  onSubmitEmail(): void {

    this.progress = true;
    this.emailForm.disable();
    this.emailFormValidations();
  }
  // USER INFO FORM SUBMIT
  onSubmitUserInfo(): void {
    this.progress = true;
    this.userInfoForm.disable();
    this.supForm.siteSaveUserInfo(this.userInfoForm.value).subscribe(data => {
      if (data.user !== undefined) {
        // pasar a una funcion para no repetir este codigo
        this.isAuth.changeAuthStatus(true);
      }
    }, error => {
      console.error(error);
    });
  }


  emailFormValidations(): void {
    if (!this.emailForm.value.agree) { this.emailTerms = true; return; }
    this.emailTerms = false;
    if (this.account.account === 'dosent') {
      if (this.emailForm.value.password !== this.emailForm.value.confirmPassword ) {
        this.passMatch = true;
        return;
      }
      this.passMatch = false;
      this.newClient();
      return;
    }
    this.alreadyClient();


  }

  // NEW ACCESS AND ALREADY LOGED IN
  logedInFreeSub(): void {
    const hasAccess = this.supForm.siteValidation().toPromise();
    hasAccess.then(dataAccess => {
      if (this.hanldeSiteAccess(dataAccess)) { return; }
      // then give site access
      this.supForm.newSiteAccess({payment: {type: this.siteOptions$.signup_type, processor: this.processor}}).subscribe(siteAcc => {

      this.sendEmail({email: siteAcc.access.email});
      if (this.siteOptions$.signup_type === 'free') {
          let redirecTo = this.path + '/members';
          if (this.path === 'signupform') {
            redirecTo = 'members';
          }
          this.router.navigate(['/' + redirecTo]);
          return;
      }
      this.progress = false;
      }, error => {
      console.error(error);
      }); // end add new access
  }); // end handle access if already have access
  }
 // NEW SITE ACCESS
 alreadyClient(): void {
  // close user info if user already exist
  this.isNewUser = true;
   // log in the user
  this.auth.login({email: this.emailForm.value.email, password: this.emailForm.value.password}). subscribe(data => {

    if (data.access_token === undefined) {

      this.LogInerror = data.error; return;

    }

    this.token.set(data);
    this.isAuth.changeAuthStatus(true);
    // if hass acces redirect to members area
    const hasAccess = this.supForm.siteValidation().toPromise();

    hasAccess.then(dataAccess => {
      if (this.hanldeSiteAccess(dataAccess)) { return; }
      // then give site access
      this.supForm.newSiteAccess({payment: {type: this.siteOptions$.signup_type, processor: this.processor}}).subscribe(siteAcc => {
      this.sendEmail({email: siteAcc.access.email});
      if (this.siteOptions$.signup_type === 'free') {
          let redirecTo = this.path + '/members';
          if (this.path === 'signupform') {
            redirecTo = 'members';
          }
          this.router.navigate(['/' + redirecTo]);
          return;
      }
      this.paymentProcess(2);

      this.progress = false;
      }, error => {
      console.error(error);
      }); // end add new access
  }); // end handle access if already have access

  }); // end log in

  }
  // NEW USER
  newClient(): void {
    //
    this.supForm.siteNewUser({payment: {type: this.siteOptions$.signup_type, processor: this.processor},
      email: this.emailForm.value.email, pws: this.emailForm.value.password}).subscribe(data => {
      console.log(data);
      if (data.error !== undefined) {
        alert(data.error);
        return;
      }
      if (data.access !== undefined) {
        // loged in
        this.token.set(data.access);
// this.isAuth.changeAuthStatus(true);
        // send the email awaber
       //  this.supForm.sendEmail(data.access).subscribe(resp => {
       //   console.log(resp);
       // }, error => {
       //   console.error(error);
       // });
        // next step
        this.sendEmail({email: data.access.email});
        this.paymentProcess(2);
        this.progress = false;

      }


    }, error => {
      console.log(error);
      alert('Ooops somthing when worong, plase try again or contact support.');
    });


  }
  // EMAIL IFRAME SENDER
  sendEmail(data: any): void {

    if (this.integrationOptions$.siteIntegration.crm.type !== this.integrationOptions$.businessIntegration.type) { console.log('error the type direfetn'); return; }

    // seth the form user info values in order to update the custome values and name

    this.userInfoForm.addControl('awtoken', new FormControl (this.integrationOptions$.businessIntegration.public_values.token));
    this.userInfoForm.addControl('bs', new FormControl (this.integrationOptions$.businessIntegration.bs));
    this.userInfoForm.addControl('list', new FormControl (this.integrationOptions$.siteIntegration.crm.values.listid));
    this.userInfoForm.addControl('email', new FormControl (data.email));


    // autoresponder
    const Factory = this.resolver.resolveComponentFactory(AweberComponent);
    const Ref: ComponentRef<any>  = this.autoresponder.createComponent(Factory);
    Ref.instance.value = {email: data.email, list: this.integrationOptions$.siteIntegration.crm.values.listid};

  }


  /**
   *
   * @param blockData
   * @desc toma y crea el componente dependiendo su tipo
   */
  drawComponent(blockData): any {

    if (this.previewComponents.length === 0) { return; }
    if (blockData.block_type === 'empty') {
      return true;
    }
    const elem: ViewContainerRef[]  =  this.previewComponents.filter((element, index) => index === blockData.block_number);
    const componentType = blockData.block_type;
    const value = JSON.parse(blockData.data_json);
    let component;

    if (componentType === 'button') {
        component = ButtonComponent;
    } else if (componentType === 'img') {
      component = ImageComponent;
    } else if (componentType === 'txt') {
      component = TextComponent;
    } else if (componentType === 'video') {
      component = VideoComponent;
    } else if (componentType === 'Countdown') {
      component = CountdownTimerComponent;
    }

    const Factory = this.resolver.resolveComponentFactory(component);
    const Ref: ComponentRef<any>  = elem[0].createComponent(Factory);
    Ref.instance.value = value;
    // ids pos 0 is fore row value, column value 1 and blick 2
    Ref.instance.blockPosition = blockData.block_number;

  }

// ON FOCUS OUT EMAIL VALIDATION
  onFocusOutEvent($event: any): void {
    this.validatonEmailLbl = 'Validating current email...';
    if (this.emailForm.value.email === '') { return; }
    this.supForm.accountExistVal( this.emailForm.value.email).subscribe(data => {
      this.validatonEmailLbl = '';
      this.account = data;
      if (data.account === 'dosent') {
        //      confirmPassword: new FormControl(''),
        this.emailForm.addControl('confirmPassword', new FormControl ('', [Validators.required]));
      }
    });


  }

  paymentProcess(type): void {

    switch (type) {
      case 1 :
      this.emailSignup = true;
      this.paymentOpt = false;
      this.processpymt = false;
      this.accountInfo = false;
      break;
      case 2 :
      this.emailSignup =  false;
      if (this.siteOptions$.signup_type === 'free') {
        this.paymentOpt = false;
        this.processpymt = false;
        this.accountInfo = true;
      }else {
        this.paymentOpt = true;
        this.processpymt = false;
      }

      break;
      case 3:
      this.paymentOpt = false;
      this.processpymt = true;
      this.accountInfo = false;
      break;
      case 4:
      this.processpymt = false;
      this.accountInfo = true;
      break;
    }
  }


  startForms(): void {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      agree: new FormControl(false, [Validators.required]),
    });


    this.userInfoForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl(''),
      birthday: new FormControl('', [Validators.required]),
      suiteAptNumber: new FormControl('', [Validators.required]),
      conuntry: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
    });
  }
}


export interface AccountInfo {
  phone: number;
  address: number;
  dob: number;
  custom_questions: [{id: number, question: string}];
}
