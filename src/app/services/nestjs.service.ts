import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NestJSService {

  private _apiUrl = environment.nestJs;
  private _http = inject(HttpClient);

  public testConnection(): Observable<any> {
    const url = `${this._apiUrl}/islands`;
    return this._http.get(url);
  }

  public getLocations(): Observable<any> {
    const url = `${this._apiUrl}/locations`;
    return this._http.get(url);
  }

  public getLocationBySlug(slug: string): Observable<any> {
    const url = `${this._apiUrl}/locations/${slug}`;
    return this._http.get(url);
  }

  public getProhibitedRoutes(): Observable<any> {
    const url = `${this._apiUrl}/prohibited-routes`;
    return this._http.get(url);
  }

  public getHolidays(): Observable<any> {
    const url = `${this._apiUrl}/holidays`;
    return this._http.get(url)
  }

  public addStatistics(data: any): Observable<any> {
    const url = `${this._apiUrl}/statistics`;
    return this._http.post(url, data);
  }

  public addMessage(data: any): Observable<any> {
    const url = `${this._apiUrl}/messages`;
    return this._http.post(url, data);
  }

  public getHoursByRoutes(payload: any): Observable<any> {
    const url = `${this._apiUrl}/hours-route/by-routes`;
    return this._http.post(url, payload);
  }

  public getLocationsByHour(payload: any): Observable<any> {
    const url = `${this._apiUrl}/itinerary-specific-hour/by-hours`;
    return this._http.post(url, payload);
  }

  public getLines(origin: number, destination: number): Observable<any> {
    const url = `${this._apiUrl}/locations-routes/origin/${destination}/destination/${origin}`;
    return this._http.get(url);
  }
}
