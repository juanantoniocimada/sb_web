import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _apiUrl = environment.apiTest;
  private _http = inject(HttpClient);

  public iosVersion: string | null = '1.3';
  public androidVersion: string | null = '1.2';

  public getAll(): Observable<any> {
    const url = `${this._apiUrl}/config`;
    return this._http.get(url).pipe(
      delay(0)
    );
  }

  public getIosVersion(): string | null {
    return this.iosVersion;
  }

  public getAndroidVersion(): string | null {
    return this.androidVersion;
  }
}
