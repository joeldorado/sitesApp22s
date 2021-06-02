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
import {PaypalService} from '../../services/paypal.service';
@Component({
  selector: 'app-sign-up-forms',
  templateUrl: './sign-up-forms.component.html',
  styleUrls: ['./sign-up-forms.component.scss']
})
export class SignUpFormsComponent implements AfterViewInit {
  @ViewChildren('previewComponents', {read: ViewContainerRef}) previewComponents!: QueryList<ViewContainerRef>;
  // @ViewChildren('', {read: ViewContainerRef}) autoresponder!: ViewContainerRef;
  @ViewChild('autoresponder', {read: ViewContainerRef})
   autoresponder!: ViewContainerRef;

  paypalData$!: any;
  addresses: any[] = [];
  blocks$!: any[];
  accountInfo$!: AccountInfo;
  account!: any;
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
  currentEmail = '';
  selectedPaymentOpt!: any;
  Token = '';
  Bs = '';
  List = '';
  panelOpenState = false;
  sitesStyles: any;
  bodyFont: any;
  rowBodyMargin: any = {};
  titlesMargin: any = {};
  selectedStyleRow = 'highlight';
  contactId = '';
  constructor(
    private supForm: SignUpFormService,
    private resolver: ComponentFactoryResolver,
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private sanitizer: DomSanitizer,
    private auth: AuthService,
    private paypalS: PaypalService
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

      this.sitesStyles = JSON.parse(data.style);
      document.body.style.backgroundColor = this.sitesStyles.sites_style.bodyBackground;
      if (!this.sitesStyles.sites_style.padding) {
        this.titlesMargin = {'margin-top': '20px;' };
        this.rowBodyMargin = {margin: '0px !important', border: 'none !important', 'border-radius': '0px !important'};
      }
      this.bodyFont = { 'font-family': this.sitesStyles.sites_style.bodyFont};
      this.sitesStyles.rows_style.highlight.section['font-family'] = this.sitesStyles.sites_style.bodyFont;
      console.log(this.sitesStyles);
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
      this.paymentOptions$.currency = data.integrationsOptions.business.currency;
      this.integrationOptions$ = data.integrationsOptions;
      // payment options
      setTimeout(() => {
        data.blocks.forEach(element => {
          this.drawComponent(element);
        });
      }, 1000);
    });

    this.startForms();
   } // end constructor

  /* getTokenAccess(): void {
    console.log(this.paymentOptions$.paypal.paypalAccessToken);
    this.paypalS.getPaypalAccessToken(this.paymentOptions$.paypal.paypalAccessToken).subscribe(data => {
      console.log(data);
    });
   }

   getSubscription(): void {
     this.paypalS.getSubscription('A21AALlUHImo6gnhAH-xTpn04XHibu0XPfsNJhFxGvZ1UiZwHfITairCJT1evhLBwk18KdFDfHfzay-rFPKOIy1KpxLfi_5mQ',
     'I-6X6P051XGASE').subscribe(data => {
       console.log(data);
     });
   }
   <button (click)="getTokenAccess()" mat-raised-button>get token</button>
         <button (click)="getSubscription()" mat-raised-button>get subscription</button>
   */
  rowStyle(rowBody, padding): any {
    if (rowBody === null) { return; }
    return Object.assign(rowBody, padding);
   }
   ngAfterViewInit(): void {
    // const currentStep = localStorage.getItem('currentStep');
    // if (currentStep) {
    //   this.paymentProcess(currentStep);
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
      if (data.subscriber) {
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
      if (this.siteOptions$.signup_type !== 'free') {
        this.paymentProcess(2);
        return; }
      // then give site access
      this.supForm.newSiteAccess({payment: {type: this.siteOptions$.signup_type, processor: this.processor}}).subscribe(siteAcc => {


      this.sendEmail({email: siteAcc.access.email});


      let redirecTo = this.path + '/members';
      if (this.path === 'signupform') {
        redirecTo = 'members';
      }
      this.router.navigate(['/' + redirecTo]);
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
  this.auth.login({email: this.emailForm.value.email, password: this.emailForm.value.password}).subscribe(data => {

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
    console.log('new client');
    //
    this.supForm.siteNewUser({
          payment: {type: this.siteOptions$.signup_type, processor: this.processor},
          email: this.emailForm.value.email,
          pws: this.emailForm.value.password}).subscribe(data => {

      if (data.error) { alert(data.error); return; }
      if (data.access) {
        // loged in
        this.token.set(data.access);
        this.sendEmail({email: data.access.email});
        this.paymentProcess(2);
        this.progress = false;
      }


    }, error => {
      console.log(error);
      alert('Ooops somthing when worong, plase try again or contact support.');
    });


  }

  // crm integration subscribers email sender
  sendEmail(data: any): void {
    
    if (this.integrationOptions$.site.crm.type !== this.integrationOptions$.business.type)
    { console.log('error the type direfetn'); return; }
 
    this.userInfoForm.addControl('crmType', new FormControl (this.integrationOptions$.site.crm.type));
    if (this.integrationOptions$.site.crm.type === 'aweber') {
      this.aweber(data.email);
    } else if (this.integrationOptions$.site.crm.type === 'activecampaign') {
      this.sendActivecampaign(data.email);
    }
    

  }

 sendActivecampaign(email: string) {
    this.supForm.activeCampaing(email, this.integrationOptions$.site.crm.values.listid).subscribe(resp => {

      console.log(resp);
    });
  }

  aweber(email: string) {

    this.userInfoForm.addControl('awtoken', new FormControl (this.integrationOptions$.business.public_values.token));
    this.userInfoForm.addControl('bs', new FormControl (this.integrationOptions$.business.bs));
    this.userInfoForm.addControl('list', new FormControl (this.integrationOptions$.site.crm.values.listid));
    this.userInfoForm.addControl('email', new FormControl (email));
    this.userInfoForm.addControl('refrshawtoken', new FormControl(this.integrationOptions$.business.public_values.refreshToken));

    // autoresponder
    const Factory = this.resolver.resolveComponentFactory(AweberComponent);
    const Ref: ComponentRef<any>  = this.autoresponder.createComponent(Factory);
    Ref.instance.value = {email: email, list: this.integrationOptions$.site.crm.values.listid};
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

    this.sitesStyles.rows_style.default.text.body['font-family'] = this.sitesStyles.sites_style.bodyFont;
    this.sitesStyles.rows_style.default.buttons['font-family'] = this.sitesStyles.sites_style.bodyFont;
    Ref.instance.siteStyle = this.sitesStyles.rows_style.default;
  }

// ON FOCUS OUT EMAIL VALIDATION
  onFocusOutEvent($event: any): void {
    this.validatonEmailLbl = 'Validating current email...';
    if (this.emailForm.value.email === '') { return; }
    this.currentEmail = this.emailForm.value.email;
    this.supForm.accountExistVal( this.emailForm.value.email).subscribe(data => {
      this.validatonEmailLbl = '';
      this.account = data;
      if (data.account === 'dosent') {
        //      confirmPassword: new FormControl(''),
        this.emailForm.addControl('confirmPassword', new FormControl ('', [Validators.required]));
      }
    });


  }


/**
 *
 * Form submitions functions
 */

 /**
  *
  * @param data
  * @desc set the price and payment type for stripe and paypal,
  * payment option selected ontime, recurren etc. next step card data
  */
 submitedPayOptions(data: any): void {

  // cambiar los datos para que aqui tome el cupone data

  this.selectedPaymentOpt = data.selected;
  this.selectedPaymentOpt.email = this.currentEmail;

  this.selectedPaymentOpt.paymentOptions = this.paymentOptions$; // .public.publishable_key;
  // this.selectedPaymentOpt.currency = this.paymentOptions$.currency;
  this.paymentProcess(data.type);
}
  // sign up form proccess stepper foward and backward
  paymentProcess(type): void {
    // localStorage.setItem('currentStep', type);
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
     // localStorage.removeItem('currentStep');
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
      suite_aptnumber: new FormControl('')
    });
  }
}


export interface AccountInfo {
  phone: number;
  address: number;
  dob: number;
  custom_questions: [{id: number, question: string}];
}
