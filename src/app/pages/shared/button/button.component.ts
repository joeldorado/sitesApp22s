import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import {SalesPageService} from '../../../services/sales-page.service';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
   encapsulation: ViewEncapsulation.None,
  // animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class ButtonComponent implements OnInit {
  @Input() public value: any;
  @Input() public blockPosition: any;
  @Input() public siteStyle: any;
  title = '';
  subtitle = '';
  buttonUrl = '';
  buttonData: any;
  type = '';
  constructor(private sps: SalesPageService) { }

  ngOnInit(): void {



    if (this.value === undefined || this.value === '') { return; }

    if (this.value.type !== undefined) {this.type = this.value.type; }

    this.buttonData = this.value;

    if (this.buttonData) {
      this.title = this.buttonData.title;
      this.subtitle = this.buttonData.subtitle;

      if (this.type !== '' && this.type === 'signup') {
          const path = location.pathname.split('/').slice(-1);
          // return NaN if the path jas letters 2jj enters if only numbers 12
          const pth = location.pathname.split('/')[1];
          this.buttonUrl =  pth + '/signupform';
          if (pth === 'start') {this.buttonUrl = 'signupform'; }
          if (+path[0]) {
            // if affiliate 0 no enviar numero
            // si trae enviarlo pr el url
            this.sps.validate_affiliate(path[0]).subscribe(data => {
              if (data.affiliate > 0) {
                this.buttonUrl = this.buttonUrl + '/' + data.affiliate;
              }
            });
          }

      } else {
        this.buttonUrl = this.buttonData.url;
      }


    }
  }

}
