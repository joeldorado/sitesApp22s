import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  files: File[] = [];
  @Input() public value: any;
  src!: string;
  constructor() { }

  ngOnInit(): void {
    if (this.value === undefined) { return; }
    this.src = this.value.src;

  }

}

