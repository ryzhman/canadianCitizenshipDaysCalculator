import {Component, QueryList, ViewChildren} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Router} from '@angular/router';
import {TripService} from '../../../services/trip.service';
import {SortableHeaderDirective, SortEvent} from '../sortable-header.directive';
import {Country} from '../../../models/country';
import {CountryService} from '../../../services/country/country.service';
import {BehaviorSubject, EMPTY} from 'rxjs';
import {catchError} from 'rxjs/operators';

const compare = (v1: string | number | Date | Country, v2: string | number | Date | Country) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


@Component({
  selector: 'app-trips-info',
  templateUrl: './trips-info.component.html',
  styleUrls: ['./trips-info.component.css']
})
export class TripsInfoComponent {
  landingDate: Moment;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  // trips info
  trips$ = this.tripService.allTripsWithCountries$.pipe(
    catchError(err => {
        this.errorMessageSubject.next(err.message);
        return EMPTY;
      }
    )
  );
  // errors
  errorMessageSubject = new BehaviorSubject<string>('');
  errorMessage = this.errorMessageSubject.asObservable();

  constructor(private router: Router, private tripService: TripService, private countryService: CountryService) {
    if (router.getCurrentNavigation().extras.state
      && router.getCurrentNavigation().extras.state.data
      && router.getCurrentNavigation().extras.state.data.landingDate) {
      // deserialization of date and getting it to UTC
      this.landingDate = moment(router.getCurrentNavigation().extras.state.data.landingDate).utc();
    }
  }

  onSort({column, direction}: SortEvent): void {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      // this.countries = trips;
    } else {
      // this.trips$ = this.trips$.sort((a, b) => {
      //   const res = compare(a[column], b[column]);
      //   return direction === 'asc' ? res : -res;
      // });
    }
  }

  redirectToCalculationStage(): void {
    this.router.navigate(['/application-date'], {
      state: {
        data: {
          landingDate: this.landingDate.format()
        }
      }
    });
  }
}

