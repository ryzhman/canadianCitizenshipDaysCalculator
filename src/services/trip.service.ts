import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable, throwError} from 'rxjs';
import {Trip} from '../models/trip';
import {map} from 'rxjs/operators';
import {CountryService} from './country/country.service';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // initial list of trips. TODO update with DB fetch
  private initialTripsSubject = new BehaviorSubject<Trip[]>([]);
  initialTrips$ = this.initialTripsSubject.asObservable();
  // initialTrips$: Observable<Trip[]> = of([]);
  // when a new trip is added it is published here
  private newTripSubject = new BehaviorSubject<Trip>(null);
  addedTrip$ = this.newTripSubject.asObservable();
  // updated trips
  private updatedTripSubject = new BehaviorSubject<Trip>(null);
  editedTrip$ = this.updatedTripSubject.asObservable();
  private deleteTripSubject = new BehaviorSubject<number>(0);
  deletedTrip$ = this.deleteTripSubject.asObservable();

  updatedTrips$ = combineLatest([
    this.initialTrips$,
    this.addedTrip$,
    this.editedTrip$
  ]).pipe(
    map(([existingTrips, newTrip, editedTrip]) => {
        if (editedTrip) {
          existingTrips.map(item => {
            if (editedTrip && item.id === editedTrip.id) {
              item.country = editedTrip.country;
              item.departureDate = editedTrip.departureDate;
              item.arrivalDate = editedTrip.arrivalDate;
              item.notes = editedTrip.notes;
            }
            return item;
          });
        }
        if (newTrip) {
          existingTrips.push(newTrip);
        }
        return existingTrips;
      }
    )
  );

  // finalized stream
  // allTripsWithCountries$ = combineLatest([
  //   this.updatedTrips$,
  //   // this.maxTripId$,
  //   // this.deletedTrip$
  // ])
  //   .pipe(
  //     // map(([trips, maxTripId, deletedTripId]) => {
  //     //   trips.
  //     // }),
  //     map(([trips, maxExistingId]) => {
  //       if (trips.length > 0) {
  //         // find and populate countries based on provided data source
  //         return trips.map(trip => ({
  //           ...trip,
  //             country: this.countryService.getByName(trip.country.name),
  //             id: ++maxExistingId
  //           } as Trip));
  //         }
  //       }
  //     ),
  //     tap(item => console.log('Trips with countries' + JSON.stringify(item)))
  //   );

  allTripsWithCountries$ = this.updatedTrips$.pipe(
    map(trips => {
        if (trips.length > 0) {
          let maxId = Math.max(...trips.map(trip => trip.id ? trip.id : 0), 0);
          // find and populate countries based on provided data source
          return trips.map(trip => ({
            ...trip,
            country: this.countryService.getByName(trip.country.name),
            id: ++maxId
          } as Trip));
        }
      }
    ),
  );

  constructor(private http: HttpClient, private countryService: CountryService) {
  }

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

  editTrip(editedTrip: Trip): void {
    this.updatedTripSubject.next(editedTrip);
  }

  upsert(trip: Trip): boolean {
    const index = trip.id;
    index >= 0 ? this.editTrip(trip) : this.addTrip(trip);
    return true;
  }

  deleteTrip(tripId: number): void {
    // this.deleteTripSubject.emit(tripId);
  }
}
