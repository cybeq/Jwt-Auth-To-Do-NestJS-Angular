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
import {AddComponent} from "./components/dashboard/add/add/add.component";


const routes: Routes = [
  {
    path:"",
    redirectTo:"/dashboard",
    pathMatch:"full"
  },
  {
    path:"landing",
    component:LandingComponent,
    canActivate:[AuthGuard],
    children:[
                {
                  path:'',
                  component: WelcomeComponent,
                  children: [
                              { path:'signin',
                                component:  SignInComponent
                              },
                              { path:'signup',
                                component:  SignUpComponent
                              }
                  ]
                },
    ],
  },
  {
    path:"dashboard",
    component:DashboardComponent,
    canActivate:[AuthGuard],
    children:[
                { path:"",
                  component: ListComponent,
                  children:[
                            {
                              path:"edit/:id",
                              component:EditComponent
                            },
                            {
                              path:"add",
                              component:AddComponent
                            },
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
