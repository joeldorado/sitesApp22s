import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AweberComponent } from './aweber.component';

describe('AweberComponent', () => {
  let component: AweberComponent;
  let fixture: ComponentFixture<AweberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AweberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AweberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
