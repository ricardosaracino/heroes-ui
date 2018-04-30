import {NgModule} from '@angular/core';

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
