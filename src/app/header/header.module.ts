import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {LandingDateModule} from '../landing-date/landing-date.module';
import {RouterModule} from '@angular/router';
import {AboutComponent} from '../about/about/about.component';
import {LandingDateStageComponent} from '../landing-date/landing-date-selector/landing-date-stage.component';
import {TripsInfoComponent} from '../trips-info/trips-info/trips-info.component';
import {TripsInfoModule} from '../trips-info/trips-info.module';
import {AppDateCalculatorComponent} from '../app-date-caltulation/app-date-calculator/app-date-calculator.component';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    LandingDateModule,
    RouterModule,
    TripsInfoModule,
    NgBootstrapFormValidationModule.forRoot(),
    SharedModule,
    RouterModule.forRoot([
      {path: 'about', component: AboutComponent},
      {path: 'calculate-date', component: LandingDateStageComponent},
      {path: 'enter-trips-info', component: TripsInfoComponent},
      {path: 'calculate-app-date', component: AppDateCalculatorComponent},
      {path: '', redirectTo: 'about', pathMatch: 'full'},
      {path: '**', redirectTo: 'about', pathMatch: 'full'}
    ]),
  ]
})
export class HeaderModule {
}
