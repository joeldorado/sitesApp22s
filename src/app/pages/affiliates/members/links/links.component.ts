import { Component, OnInit, Input } from '@angular/core';
import {AffiliatesService} from '../../../../services/affiliates.service';
@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  @Input() siteStyles: any;
  @Input() rowPadding: any;
  linksData: any;
  currentSection = 'highlight';
  constructor(
    private affServ: AffiliatesService
  ) { }
  rowStyle(rowBody, padding): any {
    return Object.assign(rowBody, padding);
   }

  ngOnInit(): void {
    this.affServ.getAffLinksData().subscribe(data => {
      console.log(data);
      this.linksData = data;
    });
  }

}
