import { Component, Input, ComponentFactoryResolver, OnInit, ViewChildren,
  ViewContainerRef, QueryList, ComponentRef,  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from '../../login/login.component';
declare const mosaicoCropp: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  path = location.pathname.split('/');
  @Input() menuData: any;
  @Input() logedIn: any;
  pictureUrl: any;
  letter: any;
    constructor(public dialog: MatDialog) {
      this.letter = localStorage.getItem('__site_name_');
      if (this.letter === 'null') {
        this.letter = localStorage.getItem('__site_email_');
      }

     }

    openDialog(): void {
      const dialogRef = this.dialog.open(LoginComponent, {
        width: '30%',
        data: {menuData: this.menuData}
      });

      dialogRef.afterClosed().subscribe(result => {

        console.log('The dialog was closed');
        console.log(result);
        // this.animal = result;
      });
    }
  ngOnInit(): void {
    this.pictureUrl = localStorage.getItem('__site_fb_picture_url');
  }

  logOut(): void {
    localStorage.clear();
    //  this.route.navigate(['/login']);
    location.reload();
  }

}
