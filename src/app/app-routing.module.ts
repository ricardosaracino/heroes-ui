import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {LoginComponent} from './login/login.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'hero-detail/:id', component: HeroDetailComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],

})

export class AppRoutingModule {
}
