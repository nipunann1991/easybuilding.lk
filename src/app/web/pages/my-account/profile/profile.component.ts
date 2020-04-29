import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   
  @Input() profileData: any;
  @Output() isProfileEditable = new EventEmitter<any>();
 
  profile: any = {}
  isDisplayNameNull: boolean = true;
  isEditable: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.profile = this.profileData;
 
  }

  ngOnChanges(){
    this.profile = this.profileData;

    if(this.profile.display_name !== ""){
      this.isDisplayNameNull = false;
    }else{
      this.isDisplayNameNull = true;
    }
    //this.getProfileDetails();
  }


  editProfile(){
    this.isEditable = true;
    this.isProfileEditable.emit(true); 
  }

  

}
