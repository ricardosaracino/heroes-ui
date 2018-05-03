import {Component} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {AuthenticationService} from './authentication.service';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  /**
   * @param {Meta} meta
   * @param {AuthenticationService} auth
   */
  constructor(private meta: Meta) {
    this.meta.addTag({name: 'description', content: 'Tour of Heroes'});
    this.meta.addTag({name: 'author', content: 'Ricardo Saracino'});
    this.meta.addTag({name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no'});
  }
}
