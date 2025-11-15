import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private _apiUrl = environment.urlAPIV2;
  private _http = inject(HttpClient);

  public addContactMsg(data: any): Observable<any> {
    const url = `${this._apiUrl}/messages`;
    return this._http.post(url, data).pipe(delay(0));
  }
}
