import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {AuthUser} from '../models/AuthUser';
import {MessageService} from './message.service';


@Injectable()
export class AuthenticationService {

  private loginUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns {Observable<AuthUser>}
   */
  login(username: string, password: string): Observable<AuthUser> {

    const url = `${this.loginUrl}/login`;

    return this.http.post<AuthUser>(url, {'username': username, 'password': password}).pipe(
      tap(_ => this.log(`fetched AuthUser id=${username}`)),
      catchError(this.handleError<AuthUser>(`login id=${username}`)),
    );
  }

  /**
   * @param {string} operation
   * @param {T} result
   * @returns {(error: any) => Observable<T>}
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.addError(`HeroService ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('AuthenticationService: ' + message);
  }
}
