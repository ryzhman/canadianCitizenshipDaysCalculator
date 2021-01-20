import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Trip} from '../models/trip';
import {catchError, map, tap} from 'rxjs/operators';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private productUrl = 'api/trips.json';
  private addedTrips: Trip[] = [];

  constructor(private http: HttpClient) {
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.productUrl)
      .pipe(
        map(data => {
          return data.concat(this.addedTrips);
        }),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<Trip | undefined> {
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
    this.addedTrips.push(newTrip);
    // doing nothing so far
    this.http.post<Trip>(this.productUrl, newTrip)
      .pipe(
        tap(data => {
          console.log('trip was posted: ' + JSON.stringify(data));
        }),
        catchError(this.handleError)
      );
  }
}
