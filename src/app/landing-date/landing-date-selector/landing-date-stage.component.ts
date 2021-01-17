import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-date-stage',
  templateUrl: './landing-date-stage.component.html',
  styleUrls: ['./landing-date-stage.component.css']
})
export class LandingDateStageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  public handlePickedDate(date: Date): void {
    console.log('Picked date: ', date);
  }

}
