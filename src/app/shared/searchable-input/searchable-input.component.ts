import {Component, Input, ViewChild} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Country} from '../../../models/country';
import {CountryService} from '../../../services/country/country.service';

@Component({
  selector: 'app-searchable-input',
  templateUrl: './searchable-input.component.html',
  styleUrls: ['./searchable-input.component.css']
})
export class SearchableInputComponent {
  selectedCountry: Country;
  @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @Input() dataProvider: Array<any>;
  @Input() searchByField: string;
  @Input() placeholderText: string;
  @Input() labelText: string;

  constructor(private countryService: CountryService) {
  }

  search(text$: Observable<string>): void {
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      filter(term => term.length >= 2),
      map(term => (term === '' ? this.countryService.getAll()
        : this.countryService.getAll().filter(item => item.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  formatter = (result: Country) => result.name;
}
