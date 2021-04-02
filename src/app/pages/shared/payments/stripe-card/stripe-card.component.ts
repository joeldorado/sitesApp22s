import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { faCcAmex, faCcDiscover, faCcVisa, faCcMastercard} from '@fortawesome/free-brands-svg-icons';
declare function Stripe(token): any;
import {StripeService} from '../../../../services/stripe.service';
// declare const elements: any;
// declare const stripe: any;
@Component({
  selector: 'app-stripe-card',
  templateUrl: './stripe-card.component.html',
  styleUrls: ['./stripe-card.component.scss']
})
export class StripeCardComponent implements AfterViewInit {
  @ViewChild('cardInfo') cardInfo!: ElementRef;
  cardError: any;
  card: any;
  faCcAmex = faCcAmex;
  faCcDiscover = faCcDiscover;
  faCcVisa = faCcVisa;
  faCcMastercard = faCcMastercard;
  stripe: any;
  elements: any;
  constructor(private ngZone: NgZone, private stripeServ: StripeService) {
    this.stripe = Stripe('pk_test_NP2n80rZ1cJ7qCFhuMzPyuK000sO61fF6u');
    this.elements = this.stripe.elements();
   }

  ngAfterViewInit(): void {
    this.card = this.elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);
    this.card.addEventListener('change', this.onChange.bind(this));
   }

   onChange({ error }): void {
    if (error) {
      this.ngZone.run(() => this.cardError = error.message);
    } else {

      this.ngZone.run(() => this.cardError = null);
    }
   }

   async paymentProcess(step): Promise<any> {

    const {token, error } = await this.stripe.createToken(this.card);
    if (token) {
      console.log(token);
      this.stripeServ.charge({amount: 50, currency: 'USD', stripeToken: token.id, email: 'doradoaguilusjoel@gmail.com'}).subscribe(data => {
        console.log(data);
      });
    } else {
      this.ngZone.run(() => this.cardError = error.message);
    }
   }
}
