import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as _moment from 'moment';
const moment =  _moment;
@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  public dateControl = new FormControl(moment());
  lefttime!: number;
  end = '';
  intv: any;
  days = 0;
  hours = 0;
  minutes = 0;
  seconds = 0;
  constructor() {}

  ngOnInit(): void {

  }



}
