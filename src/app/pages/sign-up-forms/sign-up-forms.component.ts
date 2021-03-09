import { Component, OnInit, ViewChildren, ViewContainerRef, QueryList, ComponentFactoryResolver, ComponentRef, OnChanges } from '@angular/core';
import {SignUpFormService} from '../../services/sign-up-form.service';
import { Observable } from 'rxjs';
import {ButtonComponent} from '../shared/button/button.component';
import {TextComponent} from '../shared/text/text.component';
import {ImageComponent} from '../shared/image/image.component';
import {CountdownTimerComponent} from '../shared/countdown-timer/countdown-timer.component';
import {VideoComponent} from '../shared/video/video.component';
import {IsAuthService} from '../../services/is-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up-forms',
  templateUrl: './sign-up-forms.component.html',
  styleUrls: ['./sign-up-forms.component.scss']
})
export class SignUpFormsComponent implements OnChanges {
  @ViewChildren('previewComponents', {read: ViewContainerRef}) previewComponents!: QueryList<ViewContainerRef>;
  blocks$!: any[];
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


  viewPhone = true;
  questions: string[] = ['What are you most struggling with?'];

  constructor(
    private supForm: SignUpFormService,
    private resolver: ComponentFactoryResolver,
    private isAuth: IsAuthService,
    private router: Router
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
        this.router.navigate(['/404']);
      }
      this.blocks$ = data;
      setTimeout(() => {
        data.forEach(element => {
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
   }

  ngOnChanges(): void {
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

  onFocusOutEvent($event: any): void {
    console.log('email:', this.email);
    if (this.email === '') {
      alert('Plase enter email');
      return;
    }
    this.supForm.accountExistVal(this.email).subscribe(data => {
      this.account = data;
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
      this.paymentOpt = true;
      this.processpymt = false;
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
    console.log(this.coupone);
    if (this.coupone.length === 0) { alert('Invalid coupone'); return; }

    this.paymentsOpts$.filter(p => {

      // aply discount payment_type payment_type
      if (this.coupone[0].payment_type === p.payment_type) {
        console.log(this.coupone[0].payment_type + '----' + p.payment_type);
        if (p.payment_type === 'onetime') {
            console.log('ontimeeeeee');
            p.initial_amount = p.initial_amount - this.coupone[0].initial_amount;
            if (p.initial_amount < 0) {
              p.initial_amount = 0;
            }
        } else  if (p.payment_type === 'recurring' || p.payment_type === 'installments') {
          console.log('installments - recurring');
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
