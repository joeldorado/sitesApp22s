import { Component } from '@angular/core';
import { IsAuthService } from './services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SitesApp22S';
  constructor(private isAuth: IsAuthService, private router: Router) {
    this.isAuth.authStatus.subscribe((value) => {
      if (!value) {
       // this.router.navigate(['sitename/start']);
      }
    });
  }
}


