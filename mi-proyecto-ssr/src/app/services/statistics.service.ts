import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private _apiUrl = environment.urlAPIV2;
  private _http = inject(HttpClient);

  public addStatistics(data: any): Observable<any> {
    const url = `${this._apiUrl}/statistics`;
    return this._http.post(url, data);
  }
}
