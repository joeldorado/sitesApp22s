import { Component, Input, EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';
import {SignUpFormService} from '../../../services/sign-up-form.service';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent implements OnChanges {
  @Input() siteStyle: any;
  @Input() rowBodyMargin: any;
  @Input() titlesMargin: any;
  @Output()
  processPay: EventEmitter<any> = new EventEmitter();
  paymentsOpts$!: any[];
  copyPaymentsOpts;
  staticbkuppaymentsOpts$!: any[];
  selectedPayment = '';
  enterCoupone = '';
  coupones$!: any[];
  coupone!: Coupones[];
  invalidCoupone = false;
  aplayed = false;
  fontBody: any;
  selectedStyleRow = 'highlight';
  constructor(
    private singupForm: SignUpFormService
  ) {
      // get payment ioptions and coupones # make one fucntion in order to get the integration data and the options payment
      this.singupForm.get_paymentsOpts().subscribe(data => {

        if (data.error) { console.error(data); alert(data.error); }
        this.paymentsOpts$ = data.payments;
        this.coupones$ = data.coupones;
      });

  }
  rowStyle(rowBody, padding): any {
    if (rowBody === null) { return; }
    return Object.assign(rowBody, padding);
   }
  resetPaymentOpts(): void {
    if (this.enterCoupone === '') {
      this.paymentsOpts$ = JSON.parse(this.copyPaymentsOpts);
    }
  }

  ngOnChanges(): any {
    if (this.siteStyle){
      this.fontBody = this.siteStyle.rows_style.default.text.body;
    }
  }

  paymentProcess(Type: number): void {
    this.processPay.emit({type: Type, selected: this.paymentsOpts$[this.selectedPayment] });
  }

  applayCoupone(): void {

    this.coupone = this.coupones$.filter(c => c.coupon_keyword === this.enterCoupone);

    if (this.coupone.length === 0) { this.invalidCoupone = true; return; }
    this.invalidCoupone = false;

    if (this.copyPaymentsOpts === undefined) {

      this.copyPaymentsOpts = JSON.stringify(this.paymentsOpts$); // Object.assign([], data.payments);

    }else if (this.copyPaymentsOpts !== JSON.stringify(this.paymentsOpts$)){
      this.paymentsOpts$ = JSON.parse(this.copyPaymentsOpts);
    }

    this.paymentsOpts$.filter(p => {
      this.aplayed = false;
      // aply discount payment_type payment_type
      if (this.coupone[0].payment_type === p.payment_type) {
        this.aplayed = true;

        if (p.payment_type === 'onetime') {

            p.initial_amount =  this.coupone[0].initial_amount;

        } else  if (p.payment_type === 'recurring' || p.payment_type === 'installments') {

          p.initial_amount =  this.coupone[0].initial_amount;
          p.recurring_amount =  this.coupone[0].recurring_amount;
          p.stripe_initial_price_id =  this.coupone[0].stripe_initial_price_id;
          p.stripe_recurring_price_id =  this.coupone[0].stripe_recurring_price_id;
          p.paypal_plan_id =  this.coupone[0].paypal_plan_id;

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
  stripe_recurring_price_id: string;
  paypal_plan_id: string;
  stripe_initial_price_id: string;
}
