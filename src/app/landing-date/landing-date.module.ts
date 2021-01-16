import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { LandingDateStageComponent } from './landing-date-selector/landing-date-stage.component';

@NgModule({
  declarations: [LandingDateStageComponent],
  exports: [
    LandingDateStageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class LandingDateModule { }
