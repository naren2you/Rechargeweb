import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { AddPlansComponent } from './pages/plans/add-plans/add-plans.component';
import { ListPlansComponent } from './pages/plans/list-plans/list-plans.component';


import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [AppComponent, HomeComponent, DashboardComponent, RegisterComponent, LoginComponent, AddPlansComponent, ListPlansComponent],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule, HttpClientModule, AppRoutingModule, TooltipModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
