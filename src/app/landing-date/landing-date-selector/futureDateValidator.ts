import {AbstractControl, ValidatorFn} from '@angular/forms';
import * as moment from 'moment';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedLandingDate = moment.utc();
    selectedLandingDate.set('year', control.value.year);
    selectedLandingDate.set('month', control.value.month);
    selectedLandingDate.set('day', control.value.day);
    selectedLandingDate.startOf('day');
    // check if the landing date selected is in the future

    debugger;
    const isFutureDate = selectedLandingDate.isAfter(moment().utc(true));
    control.setErrors(isFutureDate ? {futureDate: true} : null);
    return null;
  };
}
