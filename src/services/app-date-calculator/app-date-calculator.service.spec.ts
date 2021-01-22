import {Trip} from '../../models/trip';
import {AppDateCalculatorService} from './app-date-calculator.service';
import {Moment} from 'moment';
import * as moment from 'moment';

describe('Application date calculator test', () => {
  const landingDate: Moment = moment('2020-01-01T00:00:00');
  let trips: Trip[];
  let serviceToTest: AppDateCalculatorService;

  beforeEach(() => {
    serviceToTest = new AppDateCalculatorService();
    trips = [
      {
        country: {
          name: 'United States'
        },
        departureDate: '1/10/2019',
        arrivalDate: '1/20/2019'
      },
      {
        country: {
          name: 'Dominican Republic'
        },
        departureDate: '10/25/2019',
        arrivalDate: '10/30/2019'
      },
      {
        country: {
          name: 'Ukraine'
        },
        departureDate: '06/22/2019',
        arrivalDate: '06/27/2019'
      }
    ] as unknown as Trip[];
  });

  it('should calculate number of days abroad - simple dates set', () => {
    const result = serviceToTest.calculateDaysAbroad(trips);
    expect(result).toEqual(23);
  });

  it('should calculate number of days abroad - dates in different months (common year)', () => {
    trips[0].arrivalDate = new Date(2019, 1, 10);
    trips[1].arrivalDate = new Date(2019, 10, 5);
    trips[2].arrivalDate = new Date(2019, 6, 2);
    const result = serviceToTest.calculateDaysAbroad(trips);
    expect(result).toEqual(32 + 12 + 11);
  });

  it('should calculate number of days abroad - dates in different months (leap year)', () => {
    trips[0].departureDate = new Date(2020, 1, 10);
    trips[0].arrivalDate = new Date(2020, 2, 10);
    trips[1].departureDate = new Date(2020, 6, 5);
    trips[1].arrivalDate = new Date(2020, 7, 5);
    trips[2].departureDate = new Date(2020, 3, 25);
    trips[2].arrivalDate = new Date(2020, 4, 23);
    const result = serviceToTest.calculateDaysAbroad(trips);
    expect(result).toEqual(30 + 32 + 29);
  });

  it('should calculate number of days abroad - dates include New Year, common and leap years', () => {
    trips[0].departureDate = new Date(2018, 11, 25);
    trips[0].arrivalDate = new Date(2019, 0, 5);
    trips[1].departureDate = new Date(2019, 11, 20);
    trips[1].arrivalDate = new Date(2020, 2, 1);
    trips[2].departureDate = new Date(2020, 11, 31);
    trips[2].arrivalDate = new Date(2021, 0, 3);
    const result = serviceToTest.calculateDaysAbroad(trips);
    expect(result).toEqual(12 + 73 + 4);
  });
});
