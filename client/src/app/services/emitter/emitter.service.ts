import {EventEmitter, Injectable} from '@angular/core';
import {ITask} from "../../models/ITask";

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  private formErrorEventEmitter: EventEmitter<{code:number, message:string }> = new EventEmitter<{code:number, message:string }>();
  private addToTaskListEmitter: EventEmitter<ITask> = new EventEmitter<ITask>();
  constructor() { }
  public getFormErrorEventEmitter(): EventEmitter<{code:number, message:string }>{
    return this.formErrorEventEmitter;
  }
  public getAddToTaskListEmitter(): EventEmitter<ITask>{
    return this.addToTaskListEmitter;
  }

}
