import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-date-stage',
  templateUrl: './landing-date-stage.component.html',
  styleUrls: ['./landing-date-stage.component.css']
})
export class LandingDateStageComponent implements OnInit {
  landingDate: moment.Moment;

  constructor() {
  }

  ngOnInit(): void {
  }

  public handlePickedDate(date: moment.Moment): void {
    this.landingDate = date;
  }

  calculateResidencyTime(): number {
    const landDate = moment(this.landingDate);
    return moment().diff(landDate, 'days');
  }
}
