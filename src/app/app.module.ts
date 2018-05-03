import {NgModule} from '@angular/core';

import {AuthModule, AuthLoader, AuthStaticLoader} from '@ngx-auth/core';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {LoginComponent} from './components/login/login.component';
import {HeaderComponent} from './components/header/header.component';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroCreateComponent} from './components/hero-create/hero-create.component';
import {MessagesComponent} from './components/messages/messages.component';


import {HeroService} from './services/hero.service';
import {MessageService} from './services/message.service';
import {AuthenticationService} from './services/authentication.service';
import {AuthenticationGuard} from './gaurds/authentication.gaurd';
import {AuthHttpInterceptor} from './interceptors/auth-http-interceptor';


export function authFactory(): AuthLoader {
  return new AuthStaticLoader({
    backend: {
      endpoint: 'http://localhost:8080/authenticate',
      params: []
    },
    storage: localStorage,
    storageKey: 'auth-user',
    loginRoute: ['login'],
    defaultUrl: 'heroes'
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
    LoginComponent,
    HeaderComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroCreateComponent,
    MessagesComponent,
  ],
  providers: [
    HeroService,
    MessageService,
    AuthenticationService,
    AuthenticationGuard,
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
