import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MyAccountService } from '../../services/my-account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  @Input() profileData: any;
  profile: any = {}

  constructor( ) { 
 
   
    
  }

  ngOnInit(): void { 

  }

  ngOnChanges(){
    this.profile = this.profileData;  
  }

}
