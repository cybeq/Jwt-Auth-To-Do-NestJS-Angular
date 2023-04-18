import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing/landing.component";
import {DashboardComponent} from "./components/dashboard/dashboard/dashboard.component";
import {EditComponent} from "./components/dashboard/edit/edit/edit.component";
import {WelcomeComponent} from "./components/landing/welcome/welcome/welcome.component";
import {SignInComponent} from "./components/landing/signing/sign-in/sign-in.component";
import {SignUpComponent} from "./components/landing/signup/sign-up/sign-up.component";
import {ListComponent} from "./components/dashboard/list/list/list.component";
import {AuthGuard} from "./core/middleware/auth.guard";


const routes: Routes = [
  {
    path:"",
    redirectTo:"/dashboard",
    pathMatch:"full"
  },
  {
    path:"landing",
    component:LandingComponent,
    children:[
                {
                  path:'welcome',
                  component: WelcomeComponent
                },
                { path:'signin',
                  component:  SignInComponent
                },
                { path:'signup',
                  component:  SignUpComponent
                }
    ],
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
                { path:"list",
                  component: ListComponent,
                  children:[
                            {
                              path:"edit",
                              component:EditComponent
                            }
                  ]
                },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
