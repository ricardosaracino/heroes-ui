import {NgModule} from '@angular/core';

import { AuthModule, AuthLoader, AuthStaticLoader } from '@ngx-auth/core';


import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {LoginComponent} from './login/login.component';
import {AuthenticationService} from './authentication.service';

import {HeroService} from './hero.service';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';

import {AppRoutingModule} from './app-routing.module';
import {AuthHttpInterceptor} from './httpinterceptor/auth-http-interceptor';



export function authFactory(): AuthLoader {
  return new AuthStaticLoader({
    backend: {
      endpoint: 'http://localhost:8080/auth/login',
      params: []
    },
    storage: localStorage,
    storageKey: 'auth-user',
    loginRoute: ['login'],
    defaultUrl: ''
  });
}


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule.forRoot({
      provide: AuthLoader,
      useFactory: (authFactory)
    })
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    MessagesComponent,
    LoginComponent
  ],
  providers: [
    HeroService,
    MessageService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
