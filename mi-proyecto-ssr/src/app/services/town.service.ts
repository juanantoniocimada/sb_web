import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TownService {

  private _apiUrl = environment.urlAPIV2;
  private _http = inject(HttpClient);

  public getTowns(): Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/location`).pipe(
      delay(0)
    );
  }

  public getTownBySlug(slug: string): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/location/slug/${slug}`);
  }

  public getCombinations(): Observable<any[]> {
    return this._http.get<any[]>(`${this._apiUrl}/locations/combinations`);
  }
  
}