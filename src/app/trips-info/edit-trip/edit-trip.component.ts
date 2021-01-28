import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Trip} from '../../../models/trip';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {TripService} from '../../../services/trip.service';
import {CountryService} from '../../../services/country/country.service';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Country} from '../../../models/country';
import {Moment} from 'moment';
import {DateUtils} from '../../../services/utils/dateUtils';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {countryValidator} from '../validators/countryValidator';
import {tripDateValidator} from '../validators/tripDateValidator';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  @Input() trip: Trip;
  @Input() trips: Trip[];
  closeResult: string;
  newCountryName: string;
  newTripNotes: string;
  @Output() onTripEdited: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  formGroup: FormGroup;

  constructor(private modalService: NgbModal, private tripService: TripService, private countryService: CountryService) {
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(term => (term === '' ? this.countryService.getAll()
        : this.countryService.getAll().filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  formatter = (result: Country) => result.name;

  openEditTrip(content): void {
    // the same behaviour for both close and dismiss

    this.modalService.open(content, {
      size: 'lg',
      backdrop: 'static'
    });
    // set up the values of the corresponding group manually
    this.formGroup.get('country').patchValue(
      this.trip.country
    );
    this.formGroup.get('departureDate').patchValue(
      {
        year: new Date(this.trip.departureDate).getFullYear(),
        month: new Date(this.trip.departureDate).getMonth() + 1,
        day: new Date(this.trip.departureDate).getDate()
      }
    );
    this.formGroup.get('arrivalDate').patchValue({
        year: new Date(this.trip.arrivalDate).getFullYear(),
        month: new Date(this.trip.arrivalDate).getMonth() + 1,
        day: new Date(this.trip.arrivalDate).getDate()
      }
    );
    this.formGroup.get('notes').patchValue(
      this.trip.notes
    );
  }

  /**
   * Posts new trip to the server and triggers the reload of the parent component
   */
  saveTrip(): void {
    let country: Country = this.countryService.getByName(this.country.name);
    if (!country) {
      country = new Country();
      country.name = this.newCountryName;
    }
    const newTrip = new Trip(country, this.departureDate.toDate(), this.arrivalDate.toDate(), this.tripNotes);
    newTrip.id = this.trip.id;
    this.tripService.upsert(newTrip);
    this.onTripEdited.emit(true);
  }

  deleteTrip(trip: Trip, modal: any): void {
    this.trips.splice(trip.id, 1);
    modal.close();
  }

  get country(): Country {
    return this.formGroup.get('country').value as Country;
  }

  get departureDate(): Moment {
    const value = this.formGroup.get('departureDate').value;
    return DateUtils.createMomentDate(value.year, value.month, value.day);
  }

  get arrivalDate(): Moment {
    const value = this.formGroup.get('arrivalDate').value;
    return DateUtils.createMomentDate(value.year, value.month, value.day);
  }

  get tripNotes(): string {
    return this.formGroup.get('notes').value;
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      country: new FormControl('', {
        updateOn: 'blur',
        validators: [
          Validators.required,
          countryValidator(this.countryService)
        ]
      }),
      arrivalDate: new FormControl('', [
        Validators.required,
      ]),
      departureDate: new FormControl('', [
        Validators.required,
      ]),
      notes: new FormControl('', [
        Validators.maxLength(50)
      ])
    }, {
      validators: tripDateValidator
    });
  }

  onSubmit(modal: any): void {
    modal.close();
    this.saveTrip();
  }
}
