import { Component, OnInit, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';

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

  title = '';
  subtitle = '';
  buttonUrl = '';
  buttonData: any;
  constructor() { }

  ngOnInit(): void {
    if (this.value === undefined || this.value === '') { return; }
    this.buttonData = this.value;
    if (this.buttonData) {
      this.title = this.buttonData.title;
      this.subtitle = this.buttonData.subtitle;
      this.buttonUrl = this.buttonData.url;

    }
  }

}
