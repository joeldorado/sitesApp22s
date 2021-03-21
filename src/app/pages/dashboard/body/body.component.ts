import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { faLess } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnChanges {
@Input() data: any;
@Input() domain: any;
sitesOrder: any;
userType = '';
// subscribedSites = [];
// otherSites = [];
  constructor() { }

  ngOnChanges(): void {
    console.log(this.data);
    if (this.data === undefined ) {return; }
    const settings = JSON.parse(this.data.business.user_accountinfo_settings_json);
    console.log(settings);
    if (settings.dashboard_settings_json !== undefined) {
      this.sitesOrder = settings.dashboard_settings_json;
    }
    this.userType = this.data.userType;

  }
  yourSites(userSiteAccess: any, site: any): any {
    // site_id --> site_option_live data
    if (userSiteAccess === null) { return; }
    const newData: any = [];

    userSiteAccess.forEach((element) => {
      const currentSite = site.filter(s => s.id === +element.site_id);
      newData.push({
        linkpreview_json: JSON.parse(currentSite[0].linkpreview_json),
        site_id: element.site_id,
        published: currentSite[0].published,
        site_keyword: currentSite[0].site_keyword,
        site_name: currentSite[0].site_name,
        site_type: currentSite[0].site_type,
        status: element.status,
        last_active_enrollment: element.last_active_enrollment,
        });
    });

    const  sortedArray: any[] = [];
    if (this.sitesOrder) {
      this.sitesOrder.forEach(id => {
        const siteArray = newData.filter(s => s.site_id === +id);
        if (siteArray.length > 0 ) {

          sortedArray.push(siteArray[0]);
        }
      });
    }

    if (sortedArray.length === 0) {
      return newData;
    }
    return sortedArray;
  }

  otherSites(site: any): any {
    if (site === null) { return; }
    const  sortedArray: any[] = [];
    if (this.sitesOrder) {
      this.sitesOrder.forEach(id => {
      const siteArray = site.filter(s => s.site_id === +id);

      sortedArray.push({
        linkpreview_json: JSON.parse(siteArray[0].linkpreview_json),
        site_id: siteArray[0].site_id,
        published: siteArray[0].published,
        site_keyword: siteArray[0].site_keyword,
        site_name: siteArray[0].site_name,
        site_type: siteArray[0].site_type
        });
      });
      return sortedArray;

  }
}

isOther(userSiteAccess: any, siteId: any): any {
  const otherSite = userSiteAccess.filter(us => +us.site_id === +siteId);

  if (otherSite.length === 0) {
    return true;
  }
  if (otherSite[0].status !== 'active') {
    return true;
  }
  return false;
}
}
