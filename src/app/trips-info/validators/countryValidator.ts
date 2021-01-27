import {AbstractControl, ValidatorFn} from '@angular/forms';
import {CountryService} from '../../../services/country/country.service';

export function countryValidator(countryService: CountryService): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let countryName = control.value;
    if (!countryName) {
      return null;
    }

    // value can be either the Country (if the selection is done from drop-down
    // or the string entered by the client
    if (countryName.name) {
      countryName = countryName.name;
    }
    const isCountryFound = countryService.getByName(countryName);
    return isCountryFound ? null : {invalidCountry: true};
  };
}
