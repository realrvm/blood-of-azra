import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { inject, Injectable, InjectionToken } from '@angular/core'
import { type Observable } from 'rxjs'

export const API_URL = new InjectionToken<string>('API_URL')

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient)
  private readonly apiUrl = inject(API_URL)

  get<T>(
    url: string,
    blob?: 'blob',
    params: HttpParams = new HttpParams(),
  ): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${url}`, {
      headers: this.headers,
      params,
      responseType: blob ? (blob as 'json') : 'json',
    })
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }

    return new HttpHeaders(headersConfig)
  }
}
