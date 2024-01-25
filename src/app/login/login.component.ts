import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

formdata ={email:"",password:""};
submit=false;
loading=false;
errormessage="";
  constructor(private auth:AuthService){ }
  
  ngOnInit(): void {
    this.auth.canAuthenticate()
  }

  onSubmit(){
  this.loading =true;
  this.auth.login(this.formdata.email,this.formdata.password)
  .subscribe({
    next:data=>{
      this.auth.storeToken(data.idToken);
      console.log("logged token is " + data.idToken);
      this.auth.canAuthenticate()
    },
    error:data=>{
      if(data.error.error.message=="INVALID_PASSWORD" || data.error.error.message=="INVALID_EMAIL"){
        this.errormessage="Invalid Credential";
      }
      else {
        this.errormessage ="Unknown error when logging into this account"
      }
    }
  }).add(()=>{
    this.loading = false;
    console.log("login completed")
  })
  
  }
}
