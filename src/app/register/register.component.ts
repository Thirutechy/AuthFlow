import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

constructor(private auth:AuthService ){}

formdata = {name:"",
email:"",
password:""
}
submit = false;
errorMessage="";
loading= false;

ngOnInit(): void {
  this.auth.canAuthenticate()
}

  onSubmit(){
  
    this.loading=true;
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.password)
    .subscribe({
      next:data=>{this.auth.storeToken(data.idToken);
        this.auth.canAuthenticate()
     
    },
    error:data=>{
      if(data.error.error.message=="INVALID_EMAIL"){
        this.errorMessage = "invalid email";
      }
      else if (data.error.error.message=="EMAIL_EXISTS"){
        this.errorMessage ="email already exists"
      }else {
        this.errorMessage = "Unknown error occured when creating this account"
      }
    }
  }).add(()=>{
    this.loading=false;
  })

  
    

  }


}
