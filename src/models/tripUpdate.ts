import {Trip} from './trip';

/**
 * Container to describe the trip and operation done over it
 */
export class TripUpdate {
  operation: Operation;
  trip: Trip;

  constructor(operation: Operation, trip: Trip) {
    this.operation = operation;
    this.trip = trip;
  }
}

export enum Operation {
  CREATE, DELETE, EDIT
}
