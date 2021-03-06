import {Injectable} from '@angular/core';
import {Country} from '../../models/country';
import {COUNTRIES} from './countries';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  countries$ = of(COUNTRIES);

  getByName(name: string): Country {
    return COUNTRIES.filter(country => country.name === name)[0];
  }

  getAll(): Country[] {
    return COUNTRIES;
  }
}
