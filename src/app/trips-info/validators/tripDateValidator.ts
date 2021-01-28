import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {DateUtils} from '../../../services/utils/dateUtils';

/**
 * Validates if the arrival date is after the departure date.
 * If validation fails, ValidationError is returned
 * @param control invalidateTripDates
 */
export const tripDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const departureDateForm = control.get('departureDate');
  const arrivalDateForm = control.get('arrivalDate');
  if ((!departureDateForm.touched && !departureDateForm.value)
    || (!arrivalDateForm.touched && !arrivalDateForm.value)) {
    // the form is not filled up yet
    return null;
  }
  // in moment months are zero-index based
  const departureDate = DateUtils.createMomentDate(
    departureDateForm.value.year,
    departureDateForm.value.month - 1,
    departureDateForm.value.day);
  const arrivalDate = DateUtils.createMomentDate(
    arrivalDateForm.value.year,
    arrivalDateForm.value.month - 1,
    arrivalDateForm.value.day);
  const areValidDates = departureDate.isBefore(arrivalDate);

  if (!areValidDates) {
    departureDateForm.setErrors({invalidateTripDates: true});
    arrivalDateForm.setErrors({invalidateTripDates: true});
  } else {
    departureDateForm.setErrors(null);
    arrivalDateForm.setErrors(null);
  }
  return areValidDates ? null : {invalidateTripDates: true};
};
