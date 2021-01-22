import {NgModule} from '@angular/core';
import {TripsInfoComponent} from './trips-info/trips-info.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NewTripComponent} from './new-trip/new-trip.component';
import {SortableHeaderDirective} from './sortable-header.directive';
import {SharedModule} from '../shared/shared.module';
import {NgbTypeaheadModule} from '@ng-bootstrap/ng-bootstrap';
import {AppDateCalculationModule} from '../app-date-caltulation/app-date-calculation.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbTypeaheadModule,
    AppDateCalculationModule
  ],
  declarations: [
    TripsInfoComponent,
    NewTripComponent,
    SortableHeaderDirective
  ]
})
export class TripsInfoModule {

}
