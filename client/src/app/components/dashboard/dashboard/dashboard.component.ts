import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public email:string = '';
  public password:string =' ';
  constructor(private authService:AuthService) {
  }

  public login(){
    this.authService.login({email:this.email, password:this.password}).subscribe(res=>{
      console.log(res)
    })
  }
}
