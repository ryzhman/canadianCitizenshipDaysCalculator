import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Router} from '@angular/router';
import {TripService} from '../../../services/trip.service';
import {Trip} from '../../../models/trip';
import {SortableHeaderDirective, SortEvent} from '../sortable-header.directive';

const compare = (v1: string | number | Date, v2: string | number | Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


@Component({
  selector: 'app-trips-info',
  templateUrl: './trips-info.component.html',
  styleUrls: ['./trips-info.component.css']
})
export class TripsInfoComponent implements OnInit {
  landingDate: Moment;
  trips: Trip[];
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(private router: Router, private tripService: TripService) {
    if (router.getCurrentNavigation().extras.state
      && router.getCurrentNavigation().extras.state.data
      && router.getCurrentNavigation().extras.state.data.landingDate) {
      // deserialization of date and getting it to UTC
      this.landingDate = moment(router.getCurrentNavigation().extras.state.data.landingDate).utc();
    }
  }

  ngOnInit(): void {
    alert('Component is reloaded');
    this.tripService.getTrips().subscribe({
      next:
        trips => {
          this.trips = trips;
          console.log('Trips loaded in trip info');
        }
    });
    console.log('Trip info onInit loaded');

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
      this.trips = this.trips.sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  refreshComponent(isRefreshRequired: boolean): void {
    if (isRefreshRequired) {
      this.ngOnInit();
    }
  }
}

