import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmitterService {
  private formErrorEventEmitter: EventEmitter<{code:number, message:string }> = new EventEmitter<{code:number, message:string }>();
  constructor() { }
  public getFormErrorEventEmitter(){
    return this.formErrorEventEmitter;
  }
}
