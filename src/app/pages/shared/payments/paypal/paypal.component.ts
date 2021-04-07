import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
declare var paypal;
import {PaypalService} from '../../../../services/paypal.service';
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement!: ElementRef;
  @Input() paypalData: any;
  @Output() nexStep: EventEmitter<number>  = new EventEmitter();

  paypal: any;
  producto = {
    descripcion: 'producto en venta',
    precio: 55000,
    img: 'asdsd',
  };

  constructor(private paypalService: PaypalService) {}

  ngOnInit(): void {
    console.log(this.paypalData);
    if (this.paypalData === undefined) { return; }
    this.paypalService.initiate(this.paypalData.paymentOptions.paypal.public.clientId,
      this.paypalData.paymentOptions.paypal.currency).subscribe(
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
                currency_code: this.paypalData.paymentOptions.paypal.currency,
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
