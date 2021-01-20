import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchableInputComponent } from './searchable-input.component';

describe('SearchableInputComponent', () => {
  let component: SearchableInputComponent;
  let fixture: ComponentFixture<SearchableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchableInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
