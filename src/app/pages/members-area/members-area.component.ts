import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {MembersAreaService} from '../../services/members-area.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-members-area',
  templateUrl: './members-area.component.html',
  styleUrls: ['./members-area.component.scss']
})
export class MembersAreaComponent implements OnInit {

  path = location.pathname.split('/');
  redirecTo = 'start';
  menuData$!: MenuData;
  blocks$!: any;

  constructor(
        private isAuth: IsAuthService,
        private router: Router,
        private ma: MembersAreaService) {

    this.isAuth.authStatus.subscribe((value) => {

      if (!value) {
        // redirect
        if (this.path.length > 1) {
          this.redirecTo = this.path[1] + '/start';
        }
        this.router.navigate([this.redirecTo]);
      }
      this.ma.getMenuPages().subscribe(data => {
        console.log(data);
        this.menuData$ = data;
      });
      this.ma.get_pages().subscribe(data => {
        console.log(data);
        this.blocks$ = data;
      });

    });
  }

  ngOnInit(): void {
    const path = location.pathname;
    // load menu
    this.ma.validateSiteAccess().subscribe( data => {
      if (data.status !== undefined) {
        localStorage.clear();
        this.router.navigate(['/login']);
       // alert(data.status);

      }
    });


    // load blocks
  }

  logIn(): void {
    localStorage.setItem('logedIn', 'yes');
    location.reload();
  }

  logOut(): void {
    localStorage.removeItem('logedIn');
    location.reload();
  }
  getPageBlocks(blocks, pageNumber): any {
    return blocks.filter(b => b.page_number === pageNumber);
  }
}
export interface MenuData {
  business: string;
  site: string;
  pages: [any];

}