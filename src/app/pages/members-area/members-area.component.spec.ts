import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersAreaComponent } from './members-area.component';

describe('MembersAreaComponent', () => {
  let component: MembersAreaComponent;
  let fixture: ComponentFixture<MembersAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
