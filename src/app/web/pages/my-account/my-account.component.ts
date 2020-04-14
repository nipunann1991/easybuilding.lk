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
        console.log(userDetails)
        localStorage.clear();  
        this.router.navigate(['login']);
    });    
  }

}
