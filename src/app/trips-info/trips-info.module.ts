import {NgModule} from '@angular/core';
import {TripsInfoComponent} from './trips-info/trips-info.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NewTripComponent} from './new-trip/new-trip.component';
import {SortableHeaderDirective} from './sortable-header.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    TripsInfoComponent,
    NewTripComponent,
    SortableHeaderDirective
  ]
})
export class TripsInfoModule {

}
