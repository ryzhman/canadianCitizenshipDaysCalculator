import {Component, EventEmitter, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  model: NgbDateStruct;
  @Output() onDatePicked: EventEmitter<moment.Moment> = new EventEmitter<moment.Moment>();

  /**
   * Handling the date selection. Event is emitted and should be handled by the parent component if interested
   */
  public onDateSelected(): void {
    // The month index starts from 0 :(
    const pickedDate = moment.utc([this.model.year, this.model.month - 1, this.model.day]);
    this.onDatePicked.emit(pickedDate);
  }
}
