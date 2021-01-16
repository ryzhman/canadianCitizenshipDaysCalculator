import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HeaderModule} from './header/header.module';
import {HeaderComponent} from './header/header/header.component';
import {SharedModule} from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HeaderModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})
export class AppModule {
}
