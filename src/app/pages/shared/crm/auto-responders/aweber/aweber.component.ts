import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-aweber',
  templateUrl: './aweber.component.html',
  styleUrls: ['./aweber.component.scss']
})
export class AweberComponent implements AfterViewInit {
  @ViewChild('btnsendMail') btnsendMail!: ElementRef;
  @Input() value: any;
  list: any;
  email: any;
  constructor() { }

  ngAfterViewInit(): void {
    console.log(this.btnsendMail);
    console.log(this.value);
    if (this.btnsendMail !== undefined) {
      console.log('aweber changed has value ');
      this.btnsendMail.nativeElement.click();
    }
  }

}
