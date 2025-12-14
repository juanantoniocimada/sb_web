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
}
