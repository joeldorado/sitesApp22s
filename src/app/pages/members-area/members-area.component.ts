import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {MembersAreaService} from '../../services/members-area.service';
@Component({
  selector: 'app-members-area',
  templateUrl: './members-area.component.html',
  styleUrls: ['./members-area.component.scss']
})
export class MembersAreaComponent implements OnInit {

  path = location.pathname.split('/');
  redirecTo = 'start';

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
        console.log('redirect');
      }else  {
        // validate site access table member_site_access

        // enviar token si no esta enviar al sales page de ese subdominio

      }

    });
  }

  ngOnInit(): void {
    const path = location.pathname;
    
    this.ma.validateSiteAccess().subscribe( data => {
      if (data.status !== undefined) {
        alert(data.status);
        localStorage.clear();
        this.router.navigate(['/login']);
      }
      console.log(data);
    });
  }

  logIn(): void {
    localStorage.setItem('logedIn', 'yes');
    location.reload();
  }
  logOut(): void {
    localStorage.removeItem('logedIn');
    location.reload();
  }
}
