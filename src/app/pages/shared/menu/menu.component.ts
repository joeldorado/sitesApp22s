import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LoginComponent} from '../../login/login.component';
import {AffiliatesService} from '../../../services/affiliates.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges {

  @Input() sitestyle: any;
  @Input() logedIn: any;
  @Input() affiliateData: any;
  @Input() title: any = 'Affiliate';
  @Input() businessName: any;
  @Output() affiliateRouting: EventEmitter<string>  = new EventEmitter();
  defaultSyle = 'default';
  pictureUrl: any;
  letter: any;
  constructor(
    public dialog: MatDialog,
    private affServ: AffiliatesService
    ) {

    this.letter = localStorage.getItem('__site_name_');
    if (this.letter === 'null') {
      this.letter = localStorage.getItem('__site_email_');
    }

   }
  ngOnChanges(): void {
    console.log(this.title);

  }
  ngOnInit(): void {
    this.pictureUrl = localStorage.getItem('__site_fb_picture_url');

  }

    openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      data: {menuData: this.businessName}
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

  menuRouting(action: string): void {
    this.affiliateRouting.emit(action);
  }

}
