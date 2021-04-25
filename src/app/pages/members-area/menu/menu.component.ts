import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
@Output() activePage: EventEmitter<object[]> = new EventEmitter();
@Input() siteStyles: any;
 @Input() menuData!: MenuData;
  pictureUrl: any;
  letter: any;
  constructor(private route: Router) {

    this.letter = localStorage.getItem('__site_name_');
    if (this.letter === 'null') {
      this.letter = localStorage.getItem('__site_email_');
    }
    this.letter.toUpperCase();
   }

  ngOnInit(): void {
    this.pictureUrl = localStorage.getItem('__site_fb_picture_url');
    console.log(this.pictureUrl);
  }

  logOut(): void {
    localStorage.clear();
    //  this.route.navigate(['/login']);
    location.reload();
  }

  setActivePage(page): void {
    this.activePage.emit(page);
  }



}


export interface MenuData {
  business: string;
  site: string;
  pages: [any];

}

