import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService as Auth } from '../../../admin/auth/auth.service';
import { Router, NavigationEnd, RouterEvent } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], 
})
export class HeaderComponent implements OnInit {

  isLogged: boolean = false; 

  constructor(
    private authservice: Auth,
    private router: Router
  ) { 

    this.isAccessed()
    
  }

  ngOnInit(): void {

    

    this.router.events.pipe( filter(e => e instanceof NavigationEnd )
    ).subscribe(e => { 
      
      if(e instanceof NavigationEnd &&  !e.url.includes("admin")){
        this.isAccessed(); 
     }
    });
  }


  isAccessed(){
    if(this.authservice.isAuthenticated()){ 
      this.isLogged = true;
    }else{ 
      this.isLogged = false;
    }
  }

}
