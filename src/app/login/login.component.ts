import {Component, OnInit} from '@angular/core';

import {AuthUser} from '../../models/auth-user';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

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
        }
      });
  }


  logout(): void {
    this.auth.invalidate();
  }
}
