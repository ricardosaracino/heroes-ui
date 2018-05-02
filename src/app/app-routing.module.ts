import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// todo add roles??

import {LoginComponent} from './login/login.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {AuthenticationGuard} from './authentication.gaurd';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {
    path: '', component: HeroesComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'heroes', component: HeroesComponent, canActivate: [AuthenticationGuard]
  },
  {path: 'hero-detail/:id', component: HeroDetailComponent, canActivate: [AuthenticationGuard], data: {roles: ['admin']}}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],

})

export class AppRoutingModule {
}
