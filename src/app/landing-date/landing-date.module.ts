import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { LandingDateStageComponent } from './landing-date-selector/landing-date-stage.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [LandingDateStageComponent],
  exports: [
    LandingDateStageComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        NgbDatepickerModule
    ]
})
export class LandingDateModule { }
