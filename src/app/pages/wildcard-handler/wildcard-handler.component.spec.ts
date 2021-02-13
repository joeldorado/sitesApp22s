import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildcardHandlerComponent } from './wildcard-handler.component';

describe('WildcardHandlerComponent', () => {
  let component: WildcardHandlerComponent;
  let fixture: ComponentFixture<WildcardHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WildcardHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WildcardHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
