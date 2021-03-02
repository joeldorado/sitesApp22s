import { Component, Input, ComponentFactoryResolver, OnInit, ViewChildren,
  ViewContainerRef, QueryList, ComponentRef,  } from '@angular/core';

declare const mosaicoCropp: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuData: any;
    constructor() { }


  ngOnInit(): void {
  }



}
