export class Trip {
  id?: number;
  country: string;
  departureDate: Date;
  arrivalDate: Date;
  notes: string;
  private flagUrl: string;

  constructor(country: string, departureDate: Date, arrivalDate: Date, notes: string, flagUrl: string) {
    this.country = country;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.notes = notes;
    this.flagUrl = flagUrl;
  }
}
