import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsInfoComponent } from './trips-info.component';

describe('TripsInfoComponent', () => {
  let component: TripsInfoComponent;
  let fixture: ComponentFixture<TripsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
