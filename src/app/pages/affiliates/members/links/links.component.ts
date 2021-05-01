import { Component, OnInit, Input } from '@angular/core';
import {AffiliatesService} from '../../../../services/affiliates.service';
@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  @Input() siteStyles: any;
  linksData: any;
  constructor(
    private affServ: AffiliatesService
  ) { }

  ngOnInit(): void {
    this.affServ.getAffLinksData().subscribe(data => {
      console.log(data);
      this.linksData = data;
    });
  }

}
