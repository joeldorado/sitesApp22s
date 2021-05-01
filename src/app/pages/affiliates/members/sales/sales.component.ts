import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  @Input() siteStyles: any;
  constructor() { }

  ngOnInit(): void {
  }

}
