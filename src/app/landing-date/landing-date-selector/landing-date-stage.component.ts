import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';

@Component({
  selector: 'app-landing-date-stage',
  templateUrl: './landing-date-stage.component.html',
  styleUrls: ['./landing-date-stage.component.css']
})
export class LandingDateStageComponent implements OnInit {
  landingDate: moment.Moment;
  formGroup: FormGroup;
  landingDateValidator: FormControl;

  constructor(private router: Router, private formBuilder: FormBuilder) {
  }

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = false;
      return null;
      // forbidden ? {forbiddenName: {value: control.value}} : null;
    };
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      landingDate: new FormControl('', [
        Validators.required,
        this.forbiddenNameValidator()
      ])
    });
    // this.formGroup.valueChanges.subscribe(newVal => console.log(newVal));
  }

  onSubmit(): void {
    if (this.formGroup && this.formGroup.controls.landingDate) {
      // The month index starts from 0 :(
      const pickedDate = moment.utc([this.formGroup.controls.landingDate.value.year,
        this.formGroup.controls.landingDate.value.month - 1,
        this.formGroup.controls.landingDate.value.day]);
      this.landingDate = pickedDate;
    }
  }

  public handlePickedDate(date: moment.Moment): void {
    this.landingDate = date.utc(true);
  }

  calculateResidencyTime(): number {
    return moment().diff(this.landingDate, 'days');
  }

  redirectToTripsStage(): void {
    this.router.navigate(['/enter-trips-info'], {state: {data: {landingDate: this.landingDate.format()}}});
  }
}
