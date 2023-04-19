import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing/landing.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { EditComponent } from './components/dashboard/edit/edit/edit.component';
import { WelcomeComponent } from './components/landing/welcome/welcome/welcome.component';
import { SignInComponent } from './components/landing/signing/sign-in/sign-in.component';
import { SignUpComponent } from './components/landing/signup/sign-up/sign-up.component';
import { ListComponent } from './components/dashboard/list/list/list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthInterceptor} from "./core/interceptor/auth.interceptor";
import { AddComponent } from './components/dashboard/add/add/add.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    EditComponent,
    WelcomeComponent,
    SignInComponent,
    SignUpComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
