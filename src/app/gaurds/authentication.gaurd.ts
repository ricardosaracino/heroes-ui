import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthLoader} from '@ngx-auth/core';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private readonly loader: AuthLoader,
              private readonly authService: AuthenticationService,
              private readonly router: Router) {
  }

  /**
   * https://angular.io/guide/router#milestone-5-route-guards
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    return this.handleAuth(url, route.data);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;

    return this.handleAuth(url, route.data);
  }

  private handleAuth(url: string, data): boolean {
    if (!this.authService.isAuthenticated) {
      this.authService.redirectUrl = url;

      this.router.navigate(this.loader.loginRoute);

      return false;
    }

    if (data.roles instanceof Array) {

      const res = this.authService.authUser.roles.filter(function (n) {
        return data.roles.indexOf(n) > -1;
      });

      console.log(`AuthenticationGuard ${url}`);

      return res.length !== 0;
    }

    return true;
  }
}
