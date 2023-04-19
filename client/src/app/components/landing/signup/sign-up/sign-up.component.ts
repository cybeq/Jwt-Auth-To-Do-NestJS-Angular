import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {IRegisterDTO} from "../../../../models/IRegisterDTO";
import {EmitterService} from "../../../../services/emitter/emitter.service";
import {Router} from "@angular/router";
import {ILoginDTO} from "../../../../models/ILoginDTO";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  @Output() printErr = new EventEmitter<string>();
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  })
  constructor(private readonly authService:AuthService,
              private readonly emitterService:EmitterService,
              private readonly router:Router) {
  }
  public registerSubmit():void{
    if(!this.registerForm.valid){
      const emailField = this.registerForm.get('email');
      if (emailField && emailField.errors) {
        this.printError({ code: 400, message: 'Nieprawidłowy adres email' });
        return;
      }
      this.printError({code:400, message:"Wypełnij poprawnie formularz"})
      return;
    }

    this.authService.register(this.registerForm.value as IRegisterDTO).subscribe(
      (res:any)=>{
        if(res.email){
          this.authService.login({email:this.registerForm.value.email, password:this.registerForm.value.password} as ILoginDTO).subscribe((res:any)=>{
            if(res.token){
              localStorage.setItem('token', res.token);
              this.router.navigate(['/dashboard'])
            }
          })
              return;
        }
      },
      (error)=>{
        if(error.status === 409){
            this.printError({code:error.status, message:"Istnieje już taki adres email"})
            return;

        }
        this.printError({code:error.status, message:"Wypełnij dane poprawnie"})
      }
    )
  }
  private printError(error:{code:number, message:string}):void{
    this.emitterService.getFormErrorEventEmitter().emit({code:error.code, message:error.message})
  }
}
