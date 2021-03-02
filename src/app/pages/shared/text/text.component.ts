import { Component, OnInit, ViewEncapsulation, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextComponent implements OnInit {
  @Input() public value: any;
  @Input() public blockPosition: any;
  inText!: string;
  constructor() { }

  ngOnInit(): void {

    if (this.value === undefined) { return; }
    this.inText = this.value.text;
  }

}
