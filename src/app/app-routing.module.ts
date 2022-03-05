import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ListPlansComponent } from './pages/plans/list-plans/list-plans.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AgentsComponent } from './pages/agents/agents.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'registration',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plans',
    component: ListPlansComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'agents',
    component: AgentsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService],
})
export class AppRoutingModule {}
