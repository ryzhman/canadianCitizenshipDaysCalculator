import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HeaderModule} from './header/header.module';
import {HeaderComponent} from './header/header/header.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    HeaderModule
  ],
  providers: [],
  bootstrap: [HeaderComponent]
})
export class AppModule { }
