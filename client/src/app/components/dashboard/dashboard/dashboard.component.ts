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

  public logout(){
    localStorage.clear();
    location.reload()
  }
}
