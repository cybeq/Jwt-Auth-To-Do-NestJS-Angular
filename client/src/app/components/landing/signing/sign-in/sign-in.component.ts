import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {ILoginDTO} from "../../../../models/ILoginDTO";
import {NavigationEnd, Route, Router} from "@angular/router";
import {EmitterService} from "../../../../services/emitter/emitter.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  @ViewChild('loginFormElement') loginFormElement!: ElementRef;
  constructor(private readonly authService:AuthService,
              private readonly router:Router,
              private readonly emitterService:EmitterService
              ) {}
  ngOnInit() {}
  public loginSubmit() : void
  {
    if(!this.loginForm.valid){
      this.printError({code: 400, message:"Wypełnij wszystkie dane"})
      return;
    }
    this.authService.login(this.loginForm.value as ILoginDTO).subscribe((res:any)=>{
      if(res.token){
        localStorage.setItem('token', res.token)
        this.router.navigate(['/dashboard'])
        return;
      }
    }, error=>{
      if(error.status === 400 ){
        this.printError({code: error.status, message:"Dane nie są poprawne"})
        return;
      }
    })
  }
  private printError(error:{code:number, message:string}) : void
  {
    this.emitterService.getFormErrorEventEmitter().emit({code:error.code, message:error.message})
  }

}
