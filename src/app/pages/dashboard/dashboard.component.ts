import { Component, OnInit } from '@angular/core';
import { IsAuthService } from '../../services/is-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  path = location.pathname.split('/');
  redirecTo = 'login';
  constructor(private isAuth: IsAuthService, private router: Router) {
    this.isAuth.authStatus.subscribe((value) => {
      if (!value) {
        // redirect
        if (this.path.length > 1 && this.path[1] !== 'dashboard') {
          this.redirecTo = this.path[1] + '/login';
        }

        this.router.navigate([this.redirecTo]);

      }
    });
  }

  ngOnInit(): void {
  }

}
