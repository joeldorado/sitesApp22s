import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {MembersAreaService} from '../../services/members-area.service';
import { Observable } from 'rxjs';
import { UpperCasePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import {Location} from '@angular/common';
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
  currentStructure!: any;
  loadingPage = false;
  constructor(
        private isAuth: IsAuthService,
        private router: Router,
        private ma: MembersAreaService,
        private tcs: TitleCasePipe,
        private loc: Location
    ) {

    this.isAuth.authStatus.subscribe((value) => {

      if (!value) {
        // redirect
        if (this.path.length > 1) {

          this.redirecTo = this.path[1] + '/start';
          if (this.path[1] === 'members') {
            this.redirecTo = 'start';
          }
        }
        this.router.navigate([this.redirecTo]);
        return;
      }

      // validate site access if not send to other
      // load menu
      this.ma.validateSiteAccess().subscribe( data => {

        let noAccess = true;
        let msg = '';
        if (data.length === 0) { noAccess = false;  msg = `You'r not a member.`; }
        else if (data[0].status !== 'active') {noAccess = false; msg = `You'r not currently active. plase contact support.`; }
        else if (data.error !== undefined) {
          noAccess = false;  msg = data.error;
        }
        if (!noAccess) {
          localStorage.clear();
          // this.notifier.notify('success', msg);
          alert(msg);
          // this.router.navigate([redirecTo]); // , {noaccess: msg}
          this.loc.back();
          return;
        }
        this.loadMembersArea();
      });

    });
  }
  loadMembersArea(): void {
    // path for load pages

    let pageName = 'Home';
    const paths = location.pathname.split('members')[1];

    if (paths !== '' && paths !== 'home') {

        pageName = paths.replace('/', '');
    }

    // gets pages fore the menu
    this.ma.getMenuPages().subscribe(data => {

      this.menuData$ = data;

      pageName = this.tcs.transform(pageName);

      const page = this.menuData$.pages.filter(p => p.page_tittle === pageName);

      let pageNumber = 0;

      if (page.length > 0) {

        pageNumber = page[0].page_number;

      } else {

        alert('404 Page not found, redirection to home page');

      }

      this.activeMenu(pageNumber);


    });
  }

  // gets blocks of current page
  loadPage(pageNumber): void {
    this.loadingPage = true;
    this.currentStructure = JSON.parse(this.menuData$.pages.filter(p => p.active === 1)[0].structure_json);

    this.ma.get_page(pageNumber).subscribe(data => {

      this.blocks$ = data;
      this.loadingPage = false;
    });

  }


  ngOnInit(): void {
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

  getPageBlocks(blocks$, pageNumber): any {

    if (blocks$ === undefined || pageNumber === undefined ) { return; }
    if (pageNumber === 0) { return blocks$.homeBlock; }
    return blocks$.blocks.filter(b => b.page_number === pageNumber);

  }

  activeMenu(pageNumber: any): void {

    this.menuData$.pages.filter((d) => {
      if (d.page_number === pageNumber) {d.active = 1; } else {d.active = 0;
      }
    });

    this.loadPage(pageNumber);

  }
}
export interface MenuData {
  business: string;
  site: string;
  pages: [any];

}
