import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Router} from '@angular/router';
import {Trip} from '../../../models/trip';
import {AppDateCalculatorService} from '../../../services/app-date-calculator/app-date-calculator.service';

@Component({
  selector: 'app-app-date-calculator',
  templateUrl: './app-date-calculator.component.html',
  styleUrls: ['./app-date-calculator.component.css']
})
export class AppDateCalculatorComponent implements OnInit {
  private readonly landingDate: Moment;
  private readonly trips: Trip[];
  applicationDate: Date;

  constructor(private router: Router, private appDateCalculatorService: AppDateCalculatorService) {
    if (router.getCurrentNavigation().extras.state
      && router.getCurrentNavigation().extras.state.data) {
      if (router.getCurrentNavigation().extras.state.data.landingDate) {
        // deserialization of date and getting it to UTC
        this.landingDate = moment(router.getCurrentNavigation().extras.state.data.landingDate).utc();
      }
      if (router.getCurrentNavigation().extras.state.data.trips) {
        this.trips = router.getCurrentNavigation().extras.state.data.trips;
      }
    }
  }

  ngOnInit(): void {
    this.applicationDate = this.appDateCalculatorService.calculateApplicationDate(this.landingDate, this.trips);
  }

  redirectTo(destination: string): void {
    this.router.navigate([destination]);
  }
}
