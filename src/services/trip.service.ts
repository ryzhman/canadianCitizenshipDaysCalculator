import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Trip} from '../models/trip';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private productUrl = 'api/trips.json';
  private addedTrips: Trip[] = [];

  constructor(private http: HttpClient) {
  }

  getTrips(): Observable<Trip[]> {
    return new Observable<Trip[]>(subscriber => subscriber.next(this.addedTrips));
    // return this.http.get<Trip[]>(this.productUrl)
    //   .pipe(
    //     map(data => {
    //       return data.concat(this.addedTrips);
    //     }),
    //     catchError(this.handleError)
    //   );
  }

  getTrip(id: number): Observable<Trip | undefined> {
    return this.getTrips()
      .pipe(
        map((products: Trip[]) => products.find(p => p.id === id))
      );
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
    const nextId = this.addedTrips.length;
    newTrip.id = nextId;
    this.addedTrips.push(newTrip);
    // this.http.post<Trip>(this.productUrl, newTrip)
    //   .pipe(
    //     tap(data => {
    //       console.log('trip was posted: ' + JSON.stringify(data));
    //     }),
    //     catchError(this.handleError)
    //   );
  }

  upsert(trip: Trip): boolean {
    const index = trip.id;
    if (index >= 0) {
      this.addedTrips[index] = trip;
    } else {
      this.addTrip(trip);
    }
    return true;
  }
}
