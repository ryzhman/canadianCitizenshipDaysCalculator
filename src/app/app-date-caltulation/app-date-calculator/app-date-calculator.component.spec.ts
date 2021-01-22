import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AppDateCalculatorComponent} from './app-date-calculator.component';


describe('AppDateCalculatorComponent', () => {
  let component: AppDateCalculatorComponent;
  let fixture: ComponentFixture<AppDateCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppDateCalculatorComponent]
    })
      .compileComponents();

    beforeEach(() => {
      fixture = TestBed.createComponent(AppDateCalculatorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
