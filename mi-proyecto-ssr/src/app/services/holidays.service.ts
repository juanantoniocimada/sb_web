import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, delay, take } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HolidaysService {
  private _apiUrl = environment.urlAPIV2;
  private _http = inject(HttpClient);

  public getHolidays(): Observable<any> {
    return this._http.get<any>(`${this._apiUrl}/holidays`).pipe(
      take(1),
      delay(0),
      catchError((error) => {
        throw error;
      })
    );
  }
}
