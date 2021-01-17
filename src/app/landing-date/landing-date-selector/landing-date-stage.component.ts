import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Component({
  selector: 'app-landing-date-stage',
  templateUrl: './landing-date-stage.component.html',
  styleUrls: ['./landing-date-stage.component.css']
})
export class LandingDateStageComponent implements OnInit {
  landingDate: moment.Moment;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public handlePickedDate(date: moment.Moment): void {
    this.landingDate = date.utc(true);
  }

  calculateResidencyTime(): number {
    return moment().diff(this.landingDate, 'days');
  }

  redirectToTripsStage(): void {
    alert(this.landingDate.format());
    this.router.navigate(['/enter-trips-info'], {state: {data: {landingDate: this.landingDate.format()}}});
  }
}
