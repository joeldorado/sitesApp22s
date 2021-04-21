import { Component, AfterViewInit, ViewChild, ElementRef, NgZone, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

declare function Stripe(token): any;
import {StripeService} from '../../../../services/stripe.service';
import { faCcAmex, faCcDiscover, faCcVisa, faCcMastercard} from '@fortawesome/free-brands-svg-icons';
// declare const elements: any;
// declare const stripe: any;
@Component({
  selector: 'app-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss']
})
export class StripeCardComponent implements AfterViewInit {
  @Input() paymentData: any;
  @Output() nexStep: EventEmitter<number> = new EventEmitter();
  @ViewChild('cardInfo') cardInfo!: ElementRef;
  cardError: any;
  card: any;
  stripe: any;
  elements: any;
  progressBar = false;
  btnDisabled = true;
  faCcAmex = faCcAmex;
  faCcDiscover = faCcDiscover;
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  stripeClientData: any;
  constructor(private ngZone: NgZone, private stripeServ: StripeService) { }

  ngAfterViewInit(): void {
    console.log(this.paymentData);
    if (this.paymentData === undefined) { return; }

    // validate if it has saved card, if is loged in then check

    this.stripeServ.getStripeClientId().subscribe(data => {
      if (data.stripe_id !== '') {
        this.stripeClientData = data;
      }
    });

    this.stripe = Stripe(this.paymentData.paymentOptions.stripe.public.publishable_key);
    this.elements = this.stripe.elements();
    console.log('payment data');
    console.log(this.paymentData);
    this.card = this.elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
   }

   onChange({ error }): void {
    if (error) {
      this.ngZone.run(() => {this.cardError = error.message; this.btnDisabled = true; });
    } else {

      this.ngZone.run(() => { this.cardError = null; this.btnDisabled = false; });

    }
   }

  async paymentProcess(step: number): Promise<any> {

    this.progressBar = true;
    const {token, error } = await this.stripe.createToken(this.card);
    if (token) {
      // SINGLE PAYMENT STRIE
      console.log(this.paymentData);
      this.paymentData.stripeToken = token.id;
      if (this.paymentData.payment_type === 'onetime') {
          this.stripeServ.charge(this.paymentData).subscribe(data => {
            this.progressBar = false;
            if (data.error) {alert(data.error); return; }
            console.log(data);
            this.nexStep.emit(step);
          });
      } else if (this.paymentData.payment_type === 'recurring') {
        // subscription stripe
        this.stripeServ.subscription(this.paymentData).subscribe(data => {
          this.progressBar = false;
          console.log(data);
          if (data.error) { alert(data.error); return; }
          this.nexStep.emit(step);
        });

      } else if (this.paymentData.payment_type === 'installments') {
        // subscription stripe
        this.stripeServ.installment(this.paymentData).subscribe( data => {
          this.progressBar = false;
          console.log(data);
          if (data.error) { alert(data.error); return; }
          else if (data.success) { this.nexStep.emit(step); }
          else {
          alert('error.');
          console.log('error response installment');
        }
        });
      }
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
   }

   payWithSavedCard(step: number): void {
    this.progressBar = true;
    console.log(this.paymentData);
    this.paymentData.stripeToken = 'chargeWithSavedCard';
    this.paymentData.stripeClienId = this.stripeClientData.stripe_id;

    if (this.paymentData.payment_type === 'onetime') {

        this.stripeServ.charge(this.paymentData).subscribe(data => {
          this.progressBar = false;
          console.log(data);
          this.nexStep.emit(step);
        });

    } else if (this.paymentData.payment_type === 'recurring') {

      this.stripeServ.subscription(this.paymentData).subscribe(data => {
        this.progressBar = false;
        console.log(data);
        this.nexStep.emit(step);
      });

    } else if (this.paymentData.payment_type === 'installments') {
      // subscription stripe

    }
   }
}
