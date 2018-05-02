import {Component, OnInit} from '@angular/core';

import {AuthenticationService} from '../authentication.service';

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

  constructor(private auth: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.auth.authenticate(this.username, this.password)
      .subscribe(() => {
        if (!this.auth.isAuthenticated) {
          console.log('Error authenticating');
        } else {
          console.log('Successfully authenticating');
        }
      });
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      if (this.auth.isAuthenticated) {
        console.log('Error un-authenticating');
      } else {
        console.log('Successfully un-authenticating');
      }
    });
  }
}
