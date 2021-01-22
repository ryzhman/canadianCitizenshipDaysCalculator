import {NgModule} from '@angular/core';
import {AppDateCalculatorComponent} from './app-date-calculator/app-date-calculator.component';
import {CommonModule} from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AppDateCalculatorComponent
  ],
  exports: [
    AppDateCalculatorComponent
  ],
})
export class AppDateCalculationModule {
}
