import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

import {HeroService} from './hero.service';
import {HeroesComponent} from './heroes/heroes.component';

import {MessageService} from './message.service';
import {MessagesComponent} from './messages/messages.component';

import {AppRoutingModule} from './app-routing.module';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';

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
    MessagesComponent
  ],
  providers: [HeroService, MessageService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
