import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Trip} from '../../models/trip';

@Injectable({
  providedIn: 'root'
})
export class AppDateCalculatorService {
  private readonly REQUIRED_DAYS = 1035;

  calculateApplicationDate(landingDate: Moment, trips: Trip[]): Date {
    const daysAboard = this.calculateDaysAbroad(trips);
    const adjustNumOfDaysTillApplication = this.REQUIRED_DAYS + daysAboard;
    return moment().add(adjustNumOfDaysTillApplication, 'days').toDate();
  }

  /**
   * Method calculates the total number of days abroad.
   * For each trip both the date of departure and arrival are calculated as abroad.
   */
  calculateDaysAbroad(trips: Trip[]): number {
    let numberOfDaysAbroad = 0;
    trips.forEach(trip => {
      // manually one day to include the first day (the last is included by default)
      numberOfDaysAbroad += moment(trip.arrivalDate).utc(true).diff(moment(trip.departureDate).utc(true), 'days') + 1;
    });
    return numberOfDaysAbroad;
  }
}
