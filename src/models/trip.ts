export class Trip {
  id?: number;
  country: string;
  departureDate: Date;
  arrivalDate: Date;
  notes: string;

  constructor(country: string, departureDate: Date, arrivalDate: Date, notes: string) {
    this.country = country;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.notes = notes;
  }
}
