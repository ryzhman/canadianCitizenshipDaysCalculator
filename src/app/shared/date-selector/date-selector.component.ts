import {Component, EventEmitter, Output} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  private model: NgbDateStruct;
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Handling the date selection. Event is emitted and should be handled by the parent component if interested
   */
  public pickDate(): void {
    const pickedDate = new Date(this.model.year, this.model.month, this.model.day);
    this.onDatePicked.emit(pickedDate);
  }
}
