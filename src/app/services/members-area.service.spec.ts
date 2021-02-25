import { TestBed } from '@angular/core/testing';

import { MembersAreaService } from './members-area.service';

describe('MembersAreaService', () => {
  let service: MembersAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
