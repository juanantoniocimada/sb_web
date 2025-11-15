import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class HomeToLines {

  public origin = {}
  public destination = {}
  public datetime = '';

  public setData(origin: {}, destination: {}, datetime: string) {
    this.origin = origin;
    this.destination = destination;
    this.datetime = datetime;
  }

  public setOrigin(origin: {}): void {
    this.origin = origin;
  }

  public setDestination(destination: {}): void {
    this.destination = destination;
  }

  public getOrigin(): {} {
    return this.origin;
  }

  public getDestination(): {} {
    return this.destination;
  }

  public getDatetime(): string {
    return this.datetime;
  }
}
