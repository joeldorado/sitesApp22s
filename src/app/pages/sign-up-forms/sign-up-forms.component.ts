import { Component, OnInit, ViewChildren, ViewContainerRef, QueryList,
  ComponentFactoryResolver, ComponentRef, OnChanges, ViewChild, ElementRef } from '@angular/core';
import {SignUpFormService} from '../../services/sign-up-form.service';
import { Observable } from 'rxjs';
import {ButtonComponent} from '../shared/button/button.component';
import {TextComponent} from '../shared/text/text.component';
import {ImageComponent} from '../shared/image/image.component';
import {CountdownTimerComponent} from '../shared/countdown-timer/countdown-timer.component';
import {VideoComponent} from '../shared/video/video.component';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';
import { faCcAmex, faCcDiscover, faCcVisa, faCcMastercard} from '@fortawesome/free-brands-svg-icons';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import {TokenService} from '../../services/token.service';
import {DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-sign-up-forms',
  templateUrl: './sign-up-forms.component.html',
  styleUrls: ['./sign-up-forms.component.scss']
})
export class SignUpFormsComponent  {
  @ViewChildren('previewComponents', {read: ViewContainerRef}) previewComponents!: QueryList<ViewContainerRef>;
  faCcAmex = faCcAmex;
  faCcDiscover = faCcDiscover;
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  addresses: any[] = [];
  blocks$!: any[];
  accountInfo$!: AccountInfo;
  account!: any;
  paymentsOpts$!: any[];
  coupones$!: any[];
  email = '';
  emailTerms = false;
  selectedPayment!: string;
  enterCoupone = '';
  password = false;
  cpassword = false;
  isAuthenticated!: boolean;
  favoriteSeason!: string;
  path = location.pathname.split('/')[1];
  coupone!: Coupones[];
  emailSignup = true;
  paymentOpt = false;
  processpymt = false;
  accountInfo = false;
  siteOptions$!: any[];
  emailDisabledBtn = true;
  viewPhone = true;
  emailForm!: FormGroup;
  userInfoForm!: FormGroup;
  questions: string[] = ['What are you most struggling with?'];
  passMatch = false;
  processor = '';
  progress = false;
  validatonEmailLbl = '';
  iframee: any;
  constructor(
    private supForm: SignUpFormService,
    private resolver: ComponentFactoryResolver,
    private isAuth: IsAuthService,
    private router: Router,
    private token: TokenService,
    private sanitizer: DomSanitizer
  ) {
    // validate log in and if it is check if is payed user then if it is send them to members area
    this.isAuth.authStatus.subscribe((value) => {
      this.isAuthenticated = value;
      if (value) {
        // if is loged in and if length > 0 the account is alredy subscribed
        this.supForm.siteValidation().subscribe(data => {
          if (data.length > 0) {
            let redirecTo = this.path + '/members';
            if (this.path === 'signupform') {
              redirecTo = 'members';
            }

            this.router.navigate(['/' + redirecTo]);
            return;
          }

          // else ist'n subscriebd

        });
      }
    });
    // get blocks data
    this.supForm.get_block().subscribe(data => {
      if (data.error){
        alert(data.error);
        // ver con rene a donde redige si no se encuentra el site
     //   this.router.navigate(['/404']);
      }
      this.blocks$ = data.blocks;
      this.siteOptions$ = data.siteOptions;
      if (this.siteOptions$[0].signup_type === 'free') {
        this.processor = 'free';
      }
      setTimeout(() => {
        data.blocks.forEach(element => {
          this.drawComponent(element);
        });
      }, 1000);

    });

    // get payment ioptions and coupones
    this.supForm.get_paymentsOpts().subscribe(data => {
      this.paymentsOpts$ = data;
    });

    this.supForm.get_coupones().subscribe(data => {
      this.coupones$ = data;
    });

    this.supForm.get_accountInfo().subscribe(data => {
      if (data.length === 0) { return; }
      this.accountInfo$ = JSON.parse(data[0].user_accountinfo_settings_json);
      for (let i = 0; i <= this.accountInfo$.address; i++) {
        const c = i + 1;
        this.addresses.push(`Address ${c}`);
      }
    });

    this.startForms();
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
    console.log(this.userInfoForm);
    this.supForm.siteSaveUserInfo(this.userInfoForm.value).subscribe(data => {
      console.log('user info saved..........');
      console.log(data);
      if (data.user !== undefined) {
        // pasar a una funcion para no repetir este codigo
        let redirecTo = this.path + '/members';
        if (this.path === 'signupform') {
          redirecTo = 'members';
        }
        this.router.navigate(['/' + redirecTo]);
        return;
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

  newClient(): void {
    this.supForm.siteNewUser({payment: {type: this.siteOptions$[0].signup_type, processor: this.processor},
      email: this.emailForm.value.email, pws: this.emailForm.value.password}).subscribe(data => {
      console.log(data);
      if (data.error !== undefined) {
        alert(data.error);
        return;
      }
      if (data.access !== undefined) {
        // loged in
        this.token.set(data.access);
        // send the email awaber
       //  this.supForm.sendEmail(data.access).subscribe(resp => {
       //   console.log(resp);
       // }, error => {
       //   console.error(error);
       // });
        // next step
        this.sendEmail({email: data.access.email, keyList: 'awlist4313354'});
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
    this.iframee = this.sanitizer.bypassSecurityTrustHtml(`
      <iframe
          width="1"
          height="1"
          src="sendEmail?${data.email}&key=${data.keyList}">
      </iframe>
    `);
  }

  alreadyClient(): void {
    console.log('already a client add to site......');
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
    console.log(type);
    switch (type) {
      case 1 :
      this.emailSignup = true;
      this.paymentOpt = false;
      this.processpymt = false;
      this.accountInfo = false;
      break;
      case 2 :
      this.emailSignup =  false;
      if (this.siteOptions$[0].signup_type === 'free') {
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
  applayCoupone(): void {
    if (this.enterCoupone === '') {
      alert('pleace enter a valid coupone name');
    }

    this.coupone = this.coupones$.filter(c => c.coupon_keyword === this.enterCoupone);

    if (this.coupone.length === 0) { alert('Invalid coupone'); return; }

    this.paymentsOpts$.filter(p => {

      // aply discount payment_type payment_type
      if (this.coupone[0].payment_type === p.payment_type) {

        if (p.payment_type === 'onetime') {

            p.initial_amount = p.initial_amount - this.coupone[0].initial_amount;
            if (p.initial_amount < 0) {
              p.initial_amount = 0;
            }
        } else  if (p.payment_type === 'recurring' || p.payment_type === 'installments') {

          p.initial_amount = p.initial_amount - this.coupone[0].initial_amount;
          p.recurring_amount = p.recurring_amount - this.coupone[0].recurring_amount;
          if (p.initial_amount < 0) {
            p.initial_amount = 0;
          }
          if (p.recurring_amount < 0) {
            p.initial_amount = 0;
          }
      }
      }
    });
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
export interface Coupones {
  site_id: number;
  coupon_number: number;
  coupon_keyword: string;
  payment_type: string;
  recurring_cycle: string;
  initial_amount: number;
  recurring_amount: number;
  number_of_payments: number;
}

export interface AccountInfo {
  phone: number;
  address: number;
  dob: number;
  custom_questions: [{id: number, question: string}];
}
