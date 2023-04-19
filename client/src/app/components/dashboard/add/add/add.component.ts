import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../../services/task/task.service";
import {EmitterService} from "../../../../services/emitter/emitter.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit{
  // status:{_id:string,name:string}
  // user:{_id:string, name:string, email:string, password:string}
  // updateUser:{_id:string, name:string, email:string, password:string}
  // updateTime:Date
  // name:string;
  // description:string;
  status:{_id:string, name:string}[] = [];
  @ViewChild('actionForms') actionForms!:ElementRef;
  taskForm = new FormGroup({
      status: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
  })

  constructor(private readonly taskService:TaskService,
              private readonly emitterService:EmitterService,
              private readonly router:Router) {
  }
  public ngOnInit():void{
    this.taskService.getStatusList().subscribe((response)=>{
      this.status = response;
      if(this.status[0]){
        this.taskForm.controls['status'].setValue(this.status[0]._id)
      }
    })
  }
  public submitTask():void{
    this.taskService.saveTask(this.taskForm.value).subscribe((response)=>{
      this.emitterService.getAddToTaskListEmitter().emit(response);
      this.router.navigate(['/dashboard'])
    }, (error)=>{
      this.actionForms.nativeElement.classList.add('shake');
      setTimeout(() => {
        this.actionForms.nativeElement.classList.remove('shake');
      }, 500);
    })
  }
}
