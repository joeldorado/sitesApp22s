import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var paypal;
import {PaypalService} from '../../../../services/paypal.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;
  @Input() paypalData: any;
  @Output() nexStep: EventEmitter<number>  = new EventEmitter();
  boton = '';
  paypal: any;
  subc = false;
  constructor(private paypalService: PaypalService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {

    if (this.paypalData === undefined) { return; }
    console.log(this.paypalData);
    if (this.paypalData.payment_type === 'onetime') {
      this.singlePayment();
    } else if (this.paypalData.payment_type === 'recurring' || this.paypalData.payment_type === 'installments') {
       this.subscription();
    }
  }

  customSubscription(): void {
    this.paypalService.processSubscription('I-21T82U9CDAMN', {paymentOptions: {paypal: { id: 2 },
    }, payment_type: 'recurrent'}).subscribe(resp => {
      console.log(resp);
  });
  }

  subscription(): void {
    const pv = JSON.parse(this.paypalData.paymentOptions.paypal.public_values);
    this.paypalService.initiate(
      'subscription',
      pv.clientId,
      this.paypalData.paymentOptions.currency,
      ).subscribe(
      () => paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: (data, actions) => {
          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: this.paypalData.paypal_plan_id // 'P-9W639366X5045830MMB3FTEQ'// 'P-9W639366X5045830MMB3FTEQ'
          });
      },
      onApprove: (data, actions) => {
        console.log(this.paypalData);

        this.paypalService.processSubscription(data.subscriptionID, this.paypalData).subscribe(resp => {
            console.log(resp);
            if (resp.error) { alert(resp.error); return; }
            this.nexStep.emit(4);
         });
        // this.paypalService.getPaypalAccessToken(
        //  this.paypalData.paymentOptions.paypal.paypalAccessToken).subscribe(tokenAccess => {
       //   console.log('token: ', tokenAccess );
       //   console.log(this.paypalData);
       //   return ;

          // this.paypalService.getSubscription(tokenAccess.access_token, data.subscriptionID).subscribe(subData => {
          //   this.paypalService.saveSubscrition(subData, this.paypalData).subscribe(saveSub => {
          //     console.log('saved subscrition paypal');
          //     console.log(saveSub);
          //     if (saveSub.error) { alert(saveSub.error); return; }
          //     this.nexStep.emit(4);
          //   });
          // });


        //});
      },
      onError:  (err) => {
       console.log(err);
      }
      }).render(this.paypalElement.nativeElement)
    );


  }

  singlePayment(): void {
    const pv = JSON.parse(this.paypalData.paymentOptions.paypal.public_values);
    this.paypalService.initiate('', pv.clientId,
      this.paypalData.paymentOptions.currency).subscribe(
      () => paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            style: {
              label: 'paypal',
              layout: 'vertical'
          },
            purchase_units: [{
              description: this.paypalData.payment_type,
              amount: {
                currency_code: this.paypalData.paymentOptions.currency,
                value: this.paypalData.initial_amount
              }
            }
            ]
          });
        },
        onApprove: async (data, actions) => {
          console.log('-------->');
          console.log(data);
          const order = await actions.order.capture();
          this.paypalService.saveTransaction(this.paypalData, order).subscribe(Response => {
            console.log(Response);
            this.nexStep.emit(4);
          });

        },
        onError: err => {
          console.error(err);
        }
      }).render(this.paypalElement.nativeElement)
    );
  }


}
