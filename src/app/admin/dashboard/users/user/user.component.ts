import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  routerParams:any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { 

    this.route.params.subscribe( (routeParams) =>  {  
      window.scroll(0,0);  

      this.routerParams = {
        user : routeParams.id,
        provider_id : routeParams.provider_id, 
      };
        
    });
    
  }
    
  ngOnInit(): void {
 
    
  }

  backToClients(){
    this.router.navigate(['/admin/users']);
  }

}
