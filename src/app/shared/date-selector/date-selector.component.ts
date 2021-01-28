import {Component, Input} from '@angular/core';
import {AbstractControl, FormGroup} from '@angular/forms';

/**
 * This component generates the HTML element for input.
 * The validation logic is created in parent form and passed in as property of parentForm
 */
@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent {
  @Input() label: string;
  /**
   * Parent form has all the validation pre-set up
   */
  @Input() parentForm: FormGroup;
  @Input() formControlTitle: string;
  @Input() formError: string;
  @Input() value: Date;

  get formModel(): any {
    return this.parentForm.get(this.formControlTitle) || null;
  }

  get formControl(): AbstractControl {
    return this.parentForm.controls[this.formControlTitle] as AbstractControl;
  }
}
