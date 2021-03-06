import { Injectable, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { appConfig } from './../model/appConfig';

@Injectable({
  providedIn: 'root'
})
export class TestConfigService {

 baseUri:string = appConfig.baseUri + '/api/testConfig';
 headers = new HttpHeaders().set('Content-Type', 'application/json');

 constructor(private http: HttpClient) { }

    // Create Test Config
    createTestConfig(data): Observable<any> {
      let url = `${this.baseUri}/createTestConfig`;
      return this.http.post(url, data)
        .pipe(
          catchError(this.errorMgmt)
        )
    }

    // Get all Test Configs
    getAllTestConfigs() {
      return this.http.get(`${this.baseUri}`);
    }

    // Get Test Config
    getTestConfig(id): Observable<any> {
      let url = `${this.baseUri}/readTestConfig/${id}`;
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    // Get Test Config
    findTestConfigByJRSS(JRSS): Observable<any> {
      let url = `${this.baseUri}/findTestConfigByJRSS/${JRSS}`;
      return this.http.get(url, {headers: this.headers}).pipe(
        map((res: Response) => {
          return res || {}
        }),
        catchError(this.errorMgmt)
      )
    }

    // Update Test Config
    updateTestConfig(id, data): Observable<any> {
      let url = `${this.baseUri}/updateTestConfig/${id}`;
      return this.http.put(url, data, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
      )
    }

  // Error handling
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    }
}
