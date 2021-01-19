import {NgModule} from '@angular/core';
import {TripsInfoComponent} from './trips-info/trips-info.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NewTripComponent} from './new-trip/new-trip.component';
import {SortableHeaderDirective} from './sortable-header.directive';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
    ],
  declarations: [
    TripsInfoComponent,
    NewTripComponent,
    SortableHeaderDirective
  ]
})
export class TripsInfoModule {

}
