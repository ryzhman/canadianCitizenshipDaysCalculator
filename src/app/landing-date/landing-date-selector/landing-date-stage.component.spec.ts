import { ComponentFixture, TestBed } from '@angular/core/testing';
import {LandingDateStageComponent} from './landing-date-stage.component';


describe('LandingDateSelecttorComponent', () => {
  let component: LandingDateStageComponent;
  let fixture: ComponentFixture<LandingDateStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingDateStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingDateStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
