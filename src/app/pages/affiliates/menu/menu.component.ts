import { Component, OnInit, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from '../../login/login.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() signUpData: any;
  @Input() sitestyle: any;
  @Input() logedIn: any;
  defaultSyle = 'default';
  pictureUrl: any;
  letter: any;
  constructor(public dialog: MatDialog) {
    this.letter = localStorage.getItem('__site_name_');
    if (this.letter === 'null') {
      this.letter = localStorage.getItem('__site_email_');
    }

   }

  ngOnInit(): void {
    this.pictureUrl = localStorage.getItem('__site_fb_picture_url');
  }

    openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      data: {menuData: this.signUpData.businessName}
    });
    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      console.log(result);
      // this.animal = result;
    });
    }
  logOut(): void {
    localStorage.clear();
    //  this.route.navigate(['/login']);
    location.reload();
  }


}
