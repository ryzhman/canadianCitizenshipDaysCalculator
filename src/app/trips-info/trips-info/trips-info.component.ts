import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-trips-info',
  templateUrl: './trips-info.component.html',
  styleUrls: ['./trips-info.component.css']
})
export class TripsInfoComponent implements OnInit {
  landingDate: Moment;

  constructor(private router: Router) {
    // deserialization of date and getting it to UTC
    this.landingDate = moment(router.getCurrentNavigation().extras.state.data.landingDate).utc();
  }

  ngOnInit(): void {

  }

}
