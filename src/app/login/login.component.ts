import {Component, OnInit} from '@angular/core';

import {AuthUser} from '../../models/AuthUser';
import {AuthenticationService} from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  authUser: AuthUser;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
  }

  login(username: string, password: string): void {
    this.authService.login(username, password)
      .subscribe(authUser => this.authUser = authUser, err => console.log(err), function () {

        localStorage.setItem('session_id', this.authUser.session_id)

        console.log(this.authUser);
      });
  }
}
