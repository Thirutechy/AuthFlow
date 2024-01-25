import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  user={localId:"",displayName:""}
  constructor(private auth:AuthService){}

  ngOnInit(): void {
    this.auth.canAccess();
    if(this.auth.isAuthenticated()){
      this.auth.details().subscribe({
        next:data=>{
          this.user.localId =data.users[0].localId;
          this.user.displayName=data.users[0].displayName;
        }
      })
    }
  }

}
