import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  formLogin;
  //Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]
  constructor(private formSvc:FormBuilder,
    private auth:AuthService,
    private route:Router
  ){
    this.formLogin = this.formSvc.group({
      'email':['', [Validators.required, Validators.email]],
      'password':['', [Validators.required]],
      'password2':['', [Validators.required]],
      'name':['', [Validators.required, Validators.minLength(3)]],
      'surName':['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit(){
    if (this.formLogin.value.password !==this.formLogin.value.password2) {
      this.getError('password2');
      return;
    }else{
      console.log(this.formLogin.value);
      this.auth.login(this.formLogin.value as any);
      this.route.navigate(['/dashboard']);
    }

   
  }

  getError(control:string){

    switch(control){
      case 'email':
        if(this.formLogin.controls.email.errors!=null && 
           Object.keys(this.formLogin.controls.email.errors).includes('required'))
           return "El campo email es requerido";
        else if(this.formLogin.controls.email.errors!=null && 
           Object.keys(this.formLogin.controls.email.errors).includes('email'))
           return "El email no es correcto";
        
        break;
      case 'password': 
        if(this.formLogin.controls.password.errors!=null && 
           Object.keys(this.formLogin.controls.password.errors).includes('required'))
           return "El campo contraseña es requerido";
        break;
        case 'password2': 
        return "Las contraseñas no son iguales";
        break;
      case 'name':
        if(this.formLogin.controls.name.errors!=null && 
           Object.keys(this.formLogin.controls.name.errors).includes('required'))
           return "El campo nombre es requerido";
        else if(this.formLogin.controls.name.errors!=null && 
           Object.keys(this.formLogin.controls.name.errors).includes('minlength'))
           return "El nombre debe tener al menos 3 caracteres";
        break;
        case 'surName':
        if(this.formLogin.controls.surName.errors!=null && 
           Object.keys(this.formLogin.controls.surName.errors).includes('required'))
           return "El campo apellido es requerido";
        else if(this.formLogin.controls.surName.errors!=null && 
           Object.keys(this.formLogin.controls.surName.errors).includes('minlength'))
           return "El apellido debe tener al menos 3 caracteres";
        break;
      default:return "";
    }
    return "";
  }

}
