import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

// todo https://stackoverflow.com/questions/45951341/cant-toggle-navbar-in-bootstrap-4-in-angular/46883241#46883241
// https://stackoverflow.com/questions/14741988/twitter-bootstrap-navbar-with-angularjs-collapse-not-functioning#17672546

export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean>;

  isCollapsed = false;

  constructor(protected authService: AuthenticationService, private router: Router) {

    console.log('HeaderComponent');

    router.events.subscribe((val) => {

      console.log('route changed');

      this.isAuthenticated$ = (new BehaviorSubject<boolean>(this.authService.isAuthenticated)).asObservable(); // {1}
    });
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout().subscribe();
  }
}
