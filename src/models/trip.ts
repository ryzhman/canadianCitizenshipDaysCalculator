import {Country} from './country';

export class Trip {
  id?: number;
  country: Country;
  departureDate: Date;
  arrivalDate: Date;
  notes: string;

  constructor(country: Country, departureDate: Date, arrivalDate: Date, notes: string) {
    this.country = country;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.notes = notes;
  }
}
