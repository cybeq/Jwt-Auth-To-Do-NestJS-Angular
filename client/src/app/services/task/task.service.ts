import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {env} from "../../env";
import {ITask} from "../../models/ITask";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly http:HttpClient) { }

  public async checkPrivilege(){
    return this.http.get(`${env.API_URL}/task/auth` ).toPromise()
  }
  public getTasks(): Observable<any>{
    return this.http.get(`${env.API_URL}/task`) as Observable<ITask[]>;
  }

  public getStatusList():Observable<any> {
    return this.http.get(`${env.API_URL}/task/status/list`) as Observable<{name:string, _id:string}[]>;
  }

  public saveTask(form:any):Observable<any> {
    return  this.http.post(`${env.API_URL}/task/create`,form as ITask);
  }
  public updateTask(form:any, id:string):Observable<any>{
    return this.http.patch(`${env.API_URL}/task/update/${id}`,form as Partial<ITask>);
  }

  public deleteTask(id:string):Observable<any>{
    return this.http.delete(`${env.API_URL}/task/delete/${id}`);
  }
}
