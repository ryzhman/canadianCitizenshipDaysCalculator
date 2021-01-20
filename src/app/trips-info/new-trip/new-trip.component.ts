import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Trip} from '../../../models/trip';
import {TripService} from '../../../services/trip.service';
import {CountryService} from '../../../services/country/country.service';
import {Country} from '../../../models/country';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
  closeResult: string;
  newCountryName: string;
  newDepartureDate: Moment;
  newArrivalDate: Moment;
  newTripNotes: string;
  @Output() onTripAdded: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal, private tripService: TripService, private countryService: CountryService) {
  }

  openNewTripModal(content): void {
    this.modalService.open(content, {size: 'lg'});
  }

  /**
   * Posts new trip to the server and triggers the reload of the parent component
   */
  saveTrip(): void {
    let country: Country = this.countryService.getByName(this.newCountryName);
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
