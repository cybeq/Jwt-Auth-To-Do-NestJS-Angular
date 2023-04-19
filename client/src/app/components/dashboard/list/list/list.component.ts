import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../../services/task/task.service";
import {ITask} from "../../../../models/ITask";
import {EmitterService} from "../../../../services/emitter/emitter.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  constructor(private readonly taskService:TaskService,
              private readonly emitterService:EmitterService) {}
  buttonText:string = "Enable edit"
  editMode!:{buttonRef:string, mode:boolean}[]
  status: {_id:string, name:string}[] = [];
  list:ITask[] = [];
  public ngOnInit(): void{
    this.taskService.getTasks().subscribe((response:ITask[])=>{
      this.list = response;
      this.list.forEach(task=>{
        task.updateTimeString = new Date(task.updateTime).toLocaleString()
      })
    })
    this.taskService.getStatusList().subscribe((response:{_id:string, name:string}[])=>{
      this.status = response;
    })
    this.emitterService.getAddToTaskListEmitter().subscribe((task:ITask)=>{
      console.log('pawianik tutaj, ', task)
      this.list.unshift(task)
    })
  }
  public edit(id:string): void{
    const readRef = document.getElementById(`read_${id}`) as HTMLDivElement;
    const editRef = document.getElementById(`edit_${id}`) as HTMLDivElement;
    readRef.style.display="none"
    editRef.style.display="inherit"
  }

  public saveEdit(id:string): void{
    const readRef = document.getElementById(`read_${id}`) as HTMLDivElement;
    const editRef = document.getElementById(`edit_${id}`) as HTMLDivElement;

    const nameRef = document.getElementById(`name_${id}`) as HTMLInputElement;
    const descriptionRef = document.getElementById(`description_${id}`) as HTMLInputElement;
    const statusRef = document.getElementById(`status_${id}`) as HTMLSelectElement;

    const taskId = id;
    const formGroup = {name: nameRef.value, description: descriptionRef.value, status: statusRef.value}
    this.taskService.updateTask(formGroup, taskId).subscribe((response:ITask)=>{
      const index = this.list.findIndex(task => task._id === response._id);
      if (index !== -1) {
        this.list[index] = response;
      }
    })

    readRef.style.display="inherit"
    editRef.style.display="none"

  }

}
