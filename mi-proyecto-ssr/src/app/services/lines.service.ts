import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Observable,
  catchError,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LinesService {
  constructor() { }

  private _apiUrl = environment.apiTest;
  private _http = inject(HttpClient);

  public getRoute(id: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/route/${id}`).pipe(
      delay(0),
      take(1),
      switchMap((response: any) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => {});
      })
    );
  }

  public getLines(origin: string, destination: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/locations-routes/origin/${destination}/destination/${origin}`).pipe(
      delay(0),
      take(1),
      catchError((error) => {
        console.error('Error fetching lines:', error);
        return throwError(() => new Error('Error fetching lines'));
      })
    );
  }

  public getHours(routeIds: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/app/hours-routes`, routeIds).pipe(
      delay(0),
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  public getLocationByLocationsRoutesId(data: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/locations-routes`, data).pipe(
      delay(0)
    );
  }

  public getLocationsByHour(data: any): Observable<any> {
    return this._http.post<any>(`${this._apiUrl}/get-itinerary-specific-hour`, data).pipe(
      delay(0)
    );
  }
}
