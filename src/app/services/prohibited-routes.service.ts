import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProhibitedRoutesService {

  private _apiUrl = environment.apiTest;
  private _http = inject(HttpClient);

  public getAll(): Observable<any> {
    const url = `${this._apiUrl}/prohibited-routes`;
    return this._http.get(url).pipe(
      delay(0)
    );
  }
}
