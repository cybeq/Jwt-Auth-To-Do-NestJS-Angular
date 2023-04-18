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

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    EditComponent,
    WelcomeComponent,
    SignInComponent,
    SignUpComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
