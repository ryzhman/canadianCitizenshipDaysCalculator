import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateSelectorComponent} from './date-selector/date-selector.component';
import {FormsModule} from '@angular/forms';
import {NgbAlertModule, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DateSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbAlertModule,
    NgbDatepickerModule
  ],
  exports: [DateSelectorComponent]
})
export class SharedModule {
}
