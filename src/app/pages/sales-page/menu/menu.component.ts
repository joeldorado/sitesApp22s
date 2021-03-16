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
    constructor(public dialog: MatDialog) {
      console.log('----');
      console.log(this.path);
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
  }



}
