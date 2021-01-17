import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingDateSelectorComponent } from './landing-date-selecttor.component';

describe('LandingDateSelecttorComponent', () => {
  let component: LandingDateSelectorComponent;
  let fixture: ComponentFixture<LandingDateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDateSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
