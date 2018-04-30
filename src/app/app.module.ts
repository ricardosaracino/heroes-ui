import {NgModule} from '@angular/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpXsrfTokenExtractor} from '@angular/common/http';


//https://theinfogrid.com/tech/developers/angular/building-http-interceptor-angular-5/
/*import {
  HttpXsrfCookieExtractor,
  HttpXsrfInterceptor,
  XSRF_COOKIE_NAME,
  XSRF_HEADER_NAME
} from '@angular/common/http/src/xsrf';*/


import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './authentication.service';

import {HeroService} from './hero.service';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';

import {AppRoutingModule} from './app-routing.module';

//https://theinfogrid.com/tech/developers/angular/building-http-interceptor-angular-5/
//https://blog.angularindepth.com/insiders-guide-into-interceptors-and-httpclient-mechanics-in-angular-103fbdb397bf
/*
@NgModule({
  providers: [
    HttpXsrfInterceptor,
    {provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true},
    {provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor},
    {provide: XSRF_COOKIE_NAME, useValue: 'connect.sid'},
    {provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN'},
  ]
})*/

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    MessagesComponent,
    LoginComponent,
    LoginComponent
  ],
  providers: [
    HeroService,
    MessageService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
