import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot} from '@angular/router';
import {AuthLoader} from '@ngx-auth/core';
import {AuthenticationService} from './authentication.service';


@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private readonly loader: AuthLoader,
              private readonly auth: AuthenticationService,
              private readonly router: Router) {
  }

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
    if (!this.auth.isAuthenticated) {
      this.auth.redirectUrl = url;

      this.router.navigate(this.loader.loginRoute);

      return false;
    }

    if (data.roles instanceof Array) {

      const res = this.auth.authUser.roles.filter(function (n) {
        return data.roles.indexOf(n) > -1;
      });

      console.log(`AuthenticationGuard ${url}`);

      return res.length !== 0;
    }

    return true;
  }
}
