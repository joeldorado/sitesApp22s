import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-members-area',
  templateUrl: './members-area.component.html',
  styleUrls: ['./members-area.component.scss']
})
export class MembersAreaComponent implements OnInit {
  path = location.pathname.split('/');
  redirecTo = 'start';
  constructor(private isAuth: IsAuthService, private router: Router) {
    this.isAuth.authStatus.subscribe((value) => {
      if (!value) {
        // redirect
        if (this.path.length > 1) {
          this.redirecTo = this.path[1] + '/start';
        }
        this.router.navigate([this.redirecTo]);
        console.log('redirect');
      }
    });
  }

  ngOnInit(): void {
    const path = location.pathname;
    console.log(path);
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
