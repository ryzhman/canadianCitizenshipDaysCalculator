import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable, throwError} from 'rxjs';
import {Trip} from '../models/trip';
import {map} from 'rxjs/operators';
import {CountryService} from './country/country.service';
import {TripUpdate, Operation} from '../models/tripUpdate';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  // initial list of trips. TODO update with DB fetch
  private initialTripsSubject = new BehaviorSubject<Trip[]>([]);
  initialTrips$ = this.initialTripsSubject.asObservable();

  // when a trip is updated it is published here
  private tripUpdateSubject = new BehaviorSubject<TripUpdate>(null);
  tripUpdate$ = this.tripUpdateSubject.asObservable();

  updatedTrips$ = combineLatest([
    this.initialTrips$,
    this.tripUpdate$
  ]).pipe(
    map(([existingTrips, tripToUpdate]) => {
        if (tripToUpdate) {
          switch (tripToUpdate.operation) {
            case Operation.EDIT: {
              const editedTrip = tripToUpdate.trip;
              existingTrips.map(item => {
                return (editedTrip && item.id === editedTrip.id) ? Object.assign(item, editedTrip) : item;
              });
              break;
            }
            case Operation.CREATE: {
              let maxId = Math.max(...existingTrips.map(trip => trip.id ? trip.id : 0), 0);
              existingTrips.push({
                ...tripToUpdate.trip,
                id: ++maxId
              });
              break;
            }
            case Operation.DELETE: {
              break;
            }
            default: {
              throw Error('Unknown operation');
            }
          }
        }
        return existingTrips;
      }
    )
  );

  /**
   * This operation required in order to read decorate objects fetched from DB with a Country information
   */
  allTripsWithCountries$ = this.updatedTrips$.pipe(
    map(trips => {
        if (trips.length > 0) {
          // find and populate countries based on provided data source
          return trips.map(trip => ({
            ...trip,
            country: this.countryService.getByName(trip.country.name),
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
    this.tripUpdateSubject.next(new TripUpdate(Operation.CREATE, newTrip));
  }

  editTrip(editedTrip: Trip): void {
    this.tripUpdateSubject.next(new TripUpdate(Operation.EDIT, editedTrip));
  }

  upsert(trip: Trip): boolean {
    const index = trip.id;
    index >= 0 ? this.editTrip(trip) : this.addTrip(trip);
    return true;
  }

  deleteTrip(tripId: number): void {
    // TODO replace null
    this.tripUpdateSubject.next(new TripUpdate(Operation.DELETE, null));
  }
}
