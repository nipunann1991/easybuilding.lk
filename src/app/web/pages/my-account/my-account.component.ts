import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as OAuth } from "angularx-social-login";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  constructor(
    private oauth: OAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.oauth.signOut().then( (userDetails) =>{  
        localStorage.clear();  
        window.location.href = "login";
        //this.router.navigate(['login']);
    }).catch((e)=>{
      console.log(e)
    });    
  }

}
