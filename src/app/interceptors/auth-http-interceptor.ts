import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import {AuthenticationService} from '../services/authentication.service';

// https://stackoverflow.com/questions/48060749/angular-5-http-interceptor-refreshing-jwt-token
// https://blog.angularindepth.com/insiders-guide-into-interceptors-and-httpclient-mechanics-in-angular-103fbdb397bf

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  /**
   *
   */
  constructor(private authService: AuthenticationService) {
  }

  /**
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... withCredentials : true ');

    const authReq = request.clone({withCredentials: true});

    return next.handle(authReq).catch(error => {

      if (error.status === 401) { // unauthorized
        // session expired (or not logged in ?)

        console.log('Status 401 Unauthorized invalidating auth');

        // clears local storage, redirects
        this.authService.invalidate();

      } else if (error.status === 403) { // forbidden
        console.log(error.status);
      }

      return Observable.throw(error);
    });
  }
}
