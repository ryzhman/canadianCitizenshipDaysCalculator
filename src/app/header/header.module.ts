import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {LandingDateModule} from '../landing-date/landing-date.module';
import {RouterModule} from '@angular/router';
import {AboutComponent} from '../about/about/about.component';
import {LandingDateStageComponent} from '../landing-date/landing-date-selector/landing-date-stage.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    LandingDateModule,
    RouterModule,
    RouterModule.forRoot([
      {path: 'about', component: AboutComponent},
      {path: 'calculate-date', component: LandingDateStageComponent},
      {path: '', redirectTo: 'about', pathMatch: 'full'},
      {path: '**', redirectTo: 'about', pathMatch: 'full'}
    ]),
  ]
})
export class HeaderModule {
}
