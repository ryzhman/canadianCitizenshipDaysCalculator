import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {DateUtils} from '../../../services/utils/dateUtils';

/**
 * Validates if the arrival date is after the departure date.
 * If validation fails, ValidationError is returned
 * @param control invalidateTripDates
 */
export const tripDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.get('departureDate').value || !control.get('arrivalDate').value) {
    // the form is not filled up yet
    return null;
  }
  // in moment months are zero-index based
  const departureDate = DateUtils.createMomentDate(
    control.get('departureDate').value.year,
    control.get('departureDate').value.month - 1,
    control.get('departureDate').value.day);
  const arrivalDate = DateUtils.createMomentDate(
    control.get('arrivalDate').value.year,
    control.get('arrivalDate').value.month - 1,
    control.get('arrivalDate').value.day);
  const areValidDates = departureDate.isBefore(arrivalDate);

  if (!areValidDates) {
    control.get('departureDate').setErrors({invalidateTripDates: true});
    control.get('arrivalDate').setErrors({invalidateTripDates: true});
  } else {
    control.get('departureDate').setErrors(null);
    control.get('arrivalDate').setErrors(null);
  }
  return areValidDates ? null : {invalidateTripDates: true};
};
