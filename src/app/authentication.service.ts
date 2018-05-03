import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {AuthLoader} from '@ngx-auth/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {AuthUser} from '../models/auth-user';
import {MessageService} from './message.service';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


// https://github.com/fulls1z3/ngx-auth/blob/master/packages/%40ngx-auth/core/src/auth.service.ts
// https://blog.realworldfullstack.io/real-world-angular-part-6-3rs-rules-roles-routes-9e7de5a3ea8e

@Injectable()
export class AuthenticationService {

  public authUser: AuthUser;

  private _redirectUrl: string;

  constructor(readonly loader: AuthLoader,
              protected readonly router: Router,
              private http: HttpClient,
              private messageService: MessageService) {

    console.log(this.loader.storage.getItem(this.loader.storageKey));

    const currentUser = JSON.parse(this.loader.storage.getItem(this.loader.storageKey) || '{}');

    this.authUser = currentUser && currentUser.authUser;
  }

  get defaultUrl(): string {
    return this.loader.defaultUrl;
  }

  get redirectUrl(): string {
    return this._redirectUrl;
  }

  set redirectUrl(value: string) {
    this._redirectUrl = value;
  }

  get username(): string {
    return this.authUser && this.authUser.username;
  }

  get roles() {
    return this.authUser && this.authUser.roles;
  }

  get isAuthenticated()  {
    return !!this.loader.storage.getItem(this.loader.storageKey);
  }

  /**
   * @param {string} username
   * @param {string} password
   * @returns {Observable<AuthUser>}
   */
  authenticate(username: string, password: string): Observable<boolean> {

    // todo return boolean

    const params = this.getHttpParams(this.loader.backend.params);

    return this.http.post<any>(this.loader.backend.endpoint, {
      'username': username,
      'password': password
    }, {params}).pipe(
      tap(authUser => {

        this.loader.storage.setItem(this.loader.storageKey, JSON.stringify({
          authUser,
        }));

        this.authUser = authUser;

        console.log(this.loader.storage.getItem(this.loader.storageKey));

        this.router.navigateByUrl(this._redirectUrl || this.loader.defaultUrl);
      }),
      catchError(
        this.handleError<AuthUser>(`login`)
      ),
    );
  }

  logout(): Observable<boolean> {
    return this.http.delete(this.loader.backend.endpoint).pipe(
      tap(_ => {
        this.log(`auth removed`);

        this.invalidate();
      }),
      catchError(this.handleError<any>('logout'))
    );
  }


  invalidate(): void {

    this.authUser = undefined;

    this.loader.storage.removeItem(this.loader.storageKey);

    this.router.navigate(this.loader.loginRoute);
  }


  protected getHttpParams = (query?: Array<any>): HttpParams => {
    let res = new HttpParams();

    if (query) {
      for (const item of query) {
        res = res.append(item.key, item.value);
      }
    }

    return res;
  };

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
      this.messageService.addError(`AuthenticationService ${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('AuthenticationService: ' + message);
  }
}
