import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Trip} from '../../../models/trip';
import {TripService} from '../../../services/trip.service';
import {CountryService} from '../../../services/country/country.service';
import {Country} from '../../../models/country';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent {
  closeResult: string;
  newCountryName: string;
  newDepartureDate: Moment;
  newArrivalDate: Moment;
  newTripNotes: string;
  @Output() onTripAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  // TODO refactor into a separate component
  selectedCountry: Country;
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(term => (term === '' ? this.countryService.getAll()
        : this.countryService.getAll().filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    )
  formatter = (result: Country) => result.name;

  constructor(private modalService: NgbModal, private tripService: TripService, private countryService: CountryService) {
  }

  openNewTripModal(content): void {
    this.modalService.open(content, {size: 'lg'});
  }

  /**
   * Posts new trip to the server and triggers the reload of the parent component
   */
  saveTrip(): void {
    let country: Country = this.countryService.getByName(this.selectedCountry.name);
    if (!country) {
      country = new Country();
      country.name = this.newCountryName;
    }
    // debugger;
    const newTrip = new Trip(country, this.newDepartureDate.toDate(), this.newArrivalDate.toDate(), this.newTripNotes);
    this.tripService.addTrip(newTrip);
    this.onTripAdded.emit(true);
  }

  handleSelectedDepartureDate(date: moment.Moment): void {
    this.newDepartureDate = date.utc(true);
  }

  handleSelectedArrivalDate(date: moment.Moment): void {
    this.newArrivalDate = date.utc(true);
  }
}
