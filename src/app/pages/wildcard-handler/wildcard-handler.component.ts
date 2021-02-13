import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import {BuisinessAndSitesIdsService} from '../../services/buisiness-and-sites-ids.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-wildcard-handler',
  templateUrl: './wildcard-handler.component.html',
  styleUrls: ['./wildcard-handler.component.scss']
})
export class WildcardHandlerComponent implements OnInit {
  salespage = false;
  membersarea = false;
  dashboard = false;
  loading = false;
  login = false;
  path = location.pathname.split('/');
  // subdoman = this.path[0].split('.')[0]; <-- production
  subdoman = 'app';
  siteName = this.path[1];
  constructor(
    private bsids: BuisinessAndSitesIdsService,
    private router: Router
  ) {
    this.getIds();
    // validar que el site exista y que el busines tambien
    // sales page
    const indexStart = this.path.indexOf('start');
    const indexMembersArea = this.path.indexOf('members');
    const indexDashboard = this.path.indexOf('dashboard');
    const indexlLogin = this.path.indexOf('login');
    if (indexStart !== -1 && this.path[indexStart] === 'start') {
      this.salespage = true;
    } else if ((indexMembersArea !== -1 && this.path[indexMembersArea] === 'members') || this.path.length === 2) {
      this.membersarea = true;
    } else if (indexDashboard !== -1 && this.path[indexDashboard] === 'dashboard') {
      this.dashboard = true;
    } else if (indexlLogin !== -1 && this.path[indexlLogin] === 'login') {
      this.login = true;
    }

   }

   getIds(): void {
    console.log(this.path);
    this.bsids.getBusinessId(this.subdoman).subscribe( business => {
      console.log(this.path[1]);
      if (business.lenght === 0) {
        this.router.navigate(['page-not-found']);
      }
      // if path has
      this.bsids.getSiteBySiteName(business[0].business_id, this.siteName).subscribe( site => {

        if (site.length === 0) {
          this.router.navigate(['page-not-found']);
        }
        this.loading = true;
      });

    });
   }

  ngOnInit(): void {
  }

}
