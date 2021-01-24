import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateSelectorComponent} from './date-selector/date-selector.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbAlertModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';

@NgModule({
  declarations: [DateSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    NgbDatepickerModule,
    NgBootstrapFormValidationModule,
    ReactiveFormsModule
  ],
  exports: [DateSelectorComponent, ReactiveFormsModule]
})
export class SharedModule {
}
