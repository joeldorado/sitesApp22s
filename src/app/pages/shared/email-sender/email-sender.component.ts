import { Component, OnInit, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent implements AfterViewInit {
  @ViewChild('btnsendMail') btnsendMail!: ElementRef;
  key: any;
  email: any;
  constructor(private route: ActivatedRoute) {
    console.log('------------->');
    this.key = this.route.snapshot.queryParamMap.get('key');
    this.email = this.route.snapshot.queryParamMap.get('email');
  }


  ngAfterViewInit(): void {
    console.log(this.btnsendMail);
    if (this.btnsendMail !== undefined) {
      console.log('changed has value ');
   //   this.btnsendMail.nativeElement.click();
    }
  }

}
