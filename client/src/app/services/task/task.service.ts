import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {env} from "../../env";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http:HttpClient) { }

  public async checkPrivilege(){
    return this.http.get(`${env.API_URL}/task/auth` ).toPromise()
  }
  public getTasks(){
    return this.http.get(`${env.API_URL}/task`)
  }

}
