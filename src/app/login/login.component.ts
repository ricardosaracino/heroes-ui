import {Component, OnInit} from '@angular/core';

import {AuthUser} from '../../models/AuthUser';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

// https://github.com/fulls1z3/ngx-auth/tree/master/packages/@ngx-auth/core

/*
export class LoginComponent implements OnInit {

  authUser: AuthUser;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.authService.login(username, password)
      .subscribe(authUser => this.authUser = authUser);
  }
}*/


export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(() => {
        if (!this.authService.isAuthenticated) {
          console.log('Error authenticating');
        }
      });
  }
}
