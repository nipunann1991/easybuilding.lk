import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as OAuth } from "angularx-social-login";
import { Globals } from "../../../app.global"
import { AuthService as Auth } from '../../../admin/auth/auth.service';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  editableMode: boolean;
  isAdminAccessible: boolean = false;
  //validateBackendUser()
  
  constructor(
    private oauth: OAuth,
    private auth: Auth,
    private router: Router,
    private globals: Globals

  ) { }

  ngOnInit(): void {
    this.isAdminAccessible = this.auth.validateBackendUser()
    
  }

  signOut(): void {
    this.oauth.signOut().then( (userDetails) =>{  
        localStorage.clear();  
        window.location.href = "login";
        //this.router.navigate(['login']);
    }).catch((e)=>{
        localStorage.clear();  
        window.location.href = "login";
    });    
  }

}
