import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthenticationGuard} from './gaurds/authentication.gaurd';
import {LoginComponent} from './components/login/login.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {HeroDetailComponent} from './components/hero-detail/hero-detail.component';
import {HeroCreateComponent} from './components/hero-create/hero-create.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent},
  {path: '', component: HeroesComponent, canActivate: [AuthenticationGuard]},
  {path: 'heroes', component: HeroesComponent, canActivate: [AuthenticationGuard]},
  {path: 'hero-detail/:id', component: HeroDetailComponent, canActivate: [AuthenticationGuard], data: {roles: ['admin']}},
  {path: 'hero-create', component: HeroCreateComponent, canActivate: [AuthenticationGuard], data: {roles: ['admin']}}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],

})

export class AppRoutingModule {
}
