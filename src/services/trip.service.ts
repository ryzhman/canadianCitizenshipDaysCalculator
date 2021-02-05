import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {combineLatest, merge, Observable, of, Subject, throwError} from 'rxjs';
import {Trip} from '../models/trip';
import {map, scan, tap} from 'rxjs/operators';
import {CountryService} from './country/country.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // initial list of trips. TODO update with DB fetch
  initialTrips$: Observable<Trip[]> = of([]);
  // when a new trip is added it is published here
  private newTripSubject = new Subject<Trip>();
  addedTrip$ = this.newTripSubject.asObservable();
  // existing and new trips are merged
  updatedTrips$ = merge(
    this.initialTrips$,
    this.addedTrip$
  ).pipe(
    // update the list of existing trips with a new one
    scan((existingTrips: Trip[], newTrip: Trip) =>
      [...existingTrips, newTrip]),
  );
  // stream with a single max ID elem
  maxTripId$ = this.updatedTrips$.pipe(
    map(trips => Math.max(...trips.map(trip => trip.id ? trip.id : 0), 0))
  );
  // finalized stream
  allTripsWithCountries$ = combineLatest([
    this.updatedTrips$,
    this.maxTripId$
  ])
    .pipe(
      map(([trips, maxExistingId]) =>
        // find and populate countries based on provided data source
        trips.map(trip => ({
          ...trip,
          country: this.countryService.getByName(trip.country.name),
          id: ++maxExistingId
        } as Trip))
      ),
      tap(item => console.log('Trips with countries' + JSON.stringify(item)))
    );

  constructor(private http: HttpClient, private countryService: CountryService) {
  }

  // getTrip(id: number): Observable<Trip | undefined> {
  //   return this.getTrips()
  //     .pipe(
  //       map((products: Trip[]) => products.find(p => p.id === id))
  //     );
  // }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addTrip(newTrip: Trip): void {
    this.newTripSubject.next(newTrip);
  }

  upsert(trip: Trip): boolean {
    const index = trip.id;
    if (index >= 0) {
      // this.addedTrips[index] = trip;
    } else {
      this.addTrip(trip);
    }
    return true;
  }
}
