import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
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
  signUpForm = false;
  path = location.pathname.split('/');
  // subdoman = this.path[0].split('.')[0]; <-- production
  subdoman = 'app';
  siteName = this.path[1];
  constructor(
    private router: Router
  ) {

    const indexStart = this.path.indexOf('start');
    const indexMembersArea = this.path.indexOf('members');
    const indexDashboard = this.path.indexOf('dashboard');
    const indexlLogin = this.path.indexOf('login');
    const indexSignUpForm = this.path.indexOf('signupform');

    if (indexStart !== -1 && this.path[indexStart] === 'start') {
      this.salespage = true;
      this.loading = true;
    } else if ((indexMembersArea !== -1 && this.path[indexMembersArea] === 'members') ||
    (this.path[indexSignUpForm] !== 'signupform') && this.path.length === 2) {
      this.membersarea = true;
      this.loading = true;
    } else if (indexDashboard !== -1 && this.path[indexDashboard] === 'dashboard') {
      this.dashboard = true;
    } else if (indexlLogin !== -1 && this.path[indexlLogin] === 'login') {
      this.login = true;
    } else if (indexSignUpForm !== -1 && this.path[indexSignUpForm] === 'signupform') {
      this.signUpForm = true;
      this.loading = true;
    }


   }



  ngOnInit(): void {
  }

}
