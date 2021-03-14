import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  msg: any = 'Sorry Site not found';
  constructor(private route: ActivatedRoute) {
    this.msg = this.route.snapshot.paramMap.get('msg');
  }

  ngOnInit(): void {
  }

}


