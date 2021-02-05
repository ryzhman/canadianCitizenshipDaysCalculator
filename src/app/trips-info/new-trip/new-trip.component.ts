import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Moment} from 'moment';
import {Trip} from '../../../models/trip';
import {TripService} from '../../../services/trip.service';
import {CountryService} from '../../../services/country/country.service';
import {Country} from '../../../models/country';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {countryValidator} from '../validators/countryValidator';
import {tripDateValidator} from '../validators/tripDateValidator';
import {DateUtils} from '../../../services/utils/dateUtils';

@Component({
  selector: 'app-new-trip',
  templateUrl: './new-trip.component.html',
  styleUrls: ['./new-trip.component.css']
})
export class NewTripComponent implements OnInit {
  closeResult: string;
  newCountryName: string;
  newTripNotes: string;
  @Output() onTripAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  formGroup: FormGroup;
  private modalRef: NgbModalRef;

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

  openNewTripModal(content): void {
    // the same behaviour for both close and dismiss
    this.modalRef = this.modalService.open(content, {size: 'lg'});
  }

  /**
   * Posts new trip to the server and triggers the reload of the parent component
   */
  saveTrip(): void {
    let country: Country = this.countryService.getByName(this.country.name);
    if (!country) {
      country = new Country(this.newCountryName);
    }
    // debugger;
    const newTrip = new Trip(country, this.departureDate.toDate(), this.arrivalDate.toDate(), this.tripNotes);
    this.tripService.addTrip(newTrip);
    this.onTripAdded.emit(true);
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

  onSubmit(): void {
    this.modalRef.close('Close click');
    this.saveTrip();
    this.formGroup.reset();
  }

  onClose(): void {
    if (this.modalRef) {
      this.modalRef.dismiss();
    }
    this.formGroup.reset();
  }
}
