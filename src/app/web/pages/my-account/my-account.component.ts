import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as OAuth } from "angularx-social-login";
import { Globals } from "../../../app.global"

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  editableMode: boolean;
  
  constructor(
    private oauth: OAuth,
    private router: Router,
    private globals: Globals

  ) { }

  ngOnInit(): void {

    
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
