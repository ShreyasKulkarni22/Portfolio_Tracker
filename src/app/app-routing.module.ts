import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MarketComponent } from './market/market.component';
import { UserportfoliosComponent } from './userportfolios/userportfolios.component';


const routes: Routes = [
  { path: '', component: HeaderComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path:'market', component: MarketComponent},
  { path: 'portfolios', component: UserportfoliosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
