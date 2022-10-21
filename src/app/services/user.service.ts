import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = "http://127.0.0.1:8000/api/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  // profileUser(id: number): Observable<User> {
  //   return this.http.get<User>(this.apiURL + 'user-profile/' + id);
  // }

  find(id: number): Observable<any> {
    return this.httpClient.get(this.apiURL + 'user-profile/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, user: User): Observable<User> {
    return this.httpClient.put<User>(this.apiURL + 'user-profile/' + id, JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
