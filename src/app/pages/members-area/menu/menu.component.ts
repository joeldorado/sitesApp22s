import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
 @Input() menuData!: MenuData;
  pictureUrl: any;

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.pictureUrl = localStorage.getItem('__site_fb_picture_url');
    console.log(this.pictureUrl);
  }

  logOut(): void {
    localStorage.clear();
    //  this.route.navigate(['/login']);
    location.reload();
  }

}


export interface MenuData {
  business: string;
  site: string;
  pages: [any];

}
