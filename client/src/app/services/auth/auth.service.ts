import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginDTO} from "../../models/ILoginDTO";
import {env} from "../../env";
import {IRegisterDTO} from "../../models/IRegisterDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http:HttpClient) {}
  public login(user:ILoginDTO){
    return this.http.post(`${env.API_URL}/user/login`, user);
  }
  public register(user:IRegisterDTO){
    return this.http.post(`${env.API_URL}/user/create`, user);
  }
}
