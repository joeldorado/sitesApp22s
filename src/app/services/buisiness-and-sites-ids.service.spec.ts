import { TestBed } from '@angular/core/testing';

import { BuisinessAndSitesIdsService } from './buisiness-and-sites-ids.service';

describe('BuisinessAndSitesIdsService', () => {
  let service: BuisinessAndSitesIdsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuisinessAndSitesIdsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
