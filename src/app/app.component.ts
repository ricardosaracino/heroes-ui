import {Component} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {AuthenticationService} from "./authentication.service";
import {LoginComponent} from "./login/login.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'Tour of Heroes';

  public auth: AuthenticationService;

  constructor(private meta: Meta, auth: AuthenticationService) {
    this.meta.addTag({name: 'description', content: 'Tour of Heroes'});
    this.meta.addTag({name: 'author', content: 'Ricardo Saracino'});
    this.meta.addTag({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'});

    this.auth = auth;
  }
}
