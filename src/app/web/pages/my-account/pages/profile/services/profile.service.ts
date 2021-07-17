import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private previousUrl: string;
  private currentUrl: string;

  private profile = new BehaviorSubject({});
  userProfileData = this.profile.asObservable();


  private fullScreenView = new BehaviorSubject(false);
  view = this.fullScreenView.asObservable();

 

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {        
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });
  }

  setProfileData(data: any) {
    this.profile.next(data)
  }

  setfullScreenView(val: boolean) {
    this.fullScreenView.next(val)
  } 
  
  getPreviousUrl() {
    return this.previousUrl;
  } 


  getCurrentUrl() {
    return this.currentUrl;
  } 

   
}
