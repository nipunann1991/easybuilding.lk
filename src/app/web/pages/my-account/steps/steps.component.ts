import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  steps: any = [
    { id: 1, title: "Business Information", active: true, completed: false },
    { id: 2, title: "Contact Details", active: false, completed: false },
    { id: 3, title: "Services", active: false, completed: false }, 
  ];

  _routeListener: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this._routeListener = router.events.subscribe((val) => {
      
        if(val instanceof NavigationEnd){
          let url = val.url; 
          let lastUrl = url.substr(url.lastIndexOf('/') + 1)
          this.activeUrl(lastUrl);
          console.log(lastUrl)
        } 
    });
  }

  ngOnInit(): void {
   
  } 

  ngOnDestroy() { 
    this._routeListener.unsubscribe();
  }

  activeUrl(url){

    switch (url) {
      case 'account-info':
        this.setActiveStatus(0);
        break;
      
      case 'contact-info':
        this.setActiveStatus(1);
        break;

      case 'service-areas':
        this.setActiveStatus(2);
        break;
    
      default:
        break;
    }
  }

  setActiveStatus(activeIndex){ 

    this.steps.forEach((element, index) => {
      
      this.steps[index].active = false;
      this.steps[index].completed = false; 
    
      if( index <= activeIndex){
        
        this.steps[index].active = true;  
        (index == activeIndex)?  this.steps[index].completed = false : this.steps[index].completed = true;     
        
      } 
      
    });
 
  }

}


 