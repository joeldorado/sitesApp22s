import { TestBed } from '@angular/core/testing';

import { SalesPageService } from './sales-page.service';

describe('SalesPageService', () => {
  let service: SalesPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
