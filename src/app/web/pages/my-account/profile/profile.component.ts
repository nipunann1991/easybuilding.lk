import { Component, OnInit } from '@angular/core';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: any = {}
  isDisplayNameNull: boolean = true;
  constructor(
    private myaccount: MyAccountService
  ) { }

  ngOnInit(): void {
    this.getProfileDetails();
  }


  getProfileDetails(){

    this.myaccount.getProfileDetails() 
      .subscribe((response: any) => {
        if (response.status == 200) {
           
          this.profile = response.data[0];  
          this.setLargeImg();

          if(this.profile.display_name !== ""){
            this.isDisplayNameNull = false;
          }

        }else{
            
        }
          
      });
  }

  setLargeImg(){
    
    switch (this.profile.provider) {
      case 'F': 
        let img = this.profile.profie_image.split('picture?type=normal');
        this.profile.profie_image = img[0]+"picture?type=large";  
        break;
      
      case 'G':
        let img1 = this.profile.profie_image.split('s96-c');
        this.profile.profie_image = img1[0]+"s200-c"; 
        break;
    
      default:
        break;
    }
  }

}
