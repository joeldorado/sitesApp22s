import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-members-area',
  templateUrl: './members-area.component.html',
  styleUrls: ['./members-area.component.scss']
})
export class MembersAreaComponent implements OnInit {

  constructor() { }

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
