import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from '../authentication.service';
import {CanActivate, Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// https://loiane.com/2017/08/angular-hide-navbar-login-page/
// https://github.com/fulls1z3/ngx-auth/tree/master/packages/@ngx-auth/core

export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService, private router: Router) {

    if (authService.isAuthenticated) { // redirect to home if logged in
      router.navigate([authService.defaultUrl]);
    }
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.authenticate(this.username, this.password)
      .subscribe(() => {
        if (!this.authService.isAuthenticated) {
          console.log('Error authenticating');
        } else {
          console.log('Successfully authenticating');
        }
      });
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      if (this.authService.isAuthenticated) {
        console.log('Error un-authenticating');
      } else {
        console.log('Successfully un-authenticating');
      }
    });
  }
}
