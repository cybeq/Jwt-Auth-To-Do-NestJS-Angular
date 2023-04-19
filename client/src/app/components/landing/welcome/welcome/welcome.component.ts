import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmitterService} from "../../../../services/emitter/emitter.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{

  errorCode:string = ''
  errorMessage:string = ''
  @ViewChild('actionForms') actionForms!:ElementRef;
  @ViewChild('errorPopup') errorPopup!:ElementRef;
  constructor(private readonly emitterService:EmitterService) {}
  ngOnInit() {
    this.emitterService.getFormErrorEventEmitter().subscribe((error:{code:number, message:string})=>{
      this.printError(error)
    })
  }
  public printError(error:{code:number, message:string}){
    this.actionForms.nativeElement.classList.add('shake');
    setTimeout(() => {
      this.actionForms.nativeElement.classList.remove('shake');
    }, 500);
    this.setErrors(error.code, error.message)
    this.errorPopup.nativeElement.style.display="inherit";
    setTimeout(() => {
      this.errorPopup.nativeElement.style.display="none";
    }, 1500)
  }

  private setErrors(code:number, message:string){
    this.errorCode = String(code);
    this.errorMessage = message;
  }
}
