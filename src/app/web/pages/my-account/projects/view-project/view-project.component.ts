import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { MyAccountService } from '../../../../../admin/api/frontend/my-account.service';
import { ProfileService } from "../../../../../admin/api/frontend/profile.service";
import { environment } from "../../../../../../environments/environment";
import { Globals } from "../../../../../app.global";
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery'; 
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  projectData: any = "";
  companyID:any;
  projectID:any;
  clientId:any;
  projectImages:any = [];
  imageURLThumb: string = "";
  imageURL: string = "";
  mainImg: string = "";
  profileImg: string = "";
  profileURL: string = "";
  openImageIndex: number = 0;
  galleryId = 'myLightbox';
  isEdiatable:boolean = false;
  isImageEditalbe :boolean = false;
  ediatableURL = "";
  galleryRef = this.gallery.ref(this.galleryId)

  // gallery images
  imagesGallery: GalleryItem[] = [ ];
  images = [ ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private myaccount: MyAccountService,
    private profile: ProfileService,
    private globals: Globals,
    public gallery: Gallery, 
    private lightbox: Lightbox
    
  ) { 
    this.profile.setfullScreenView(true);
    
    
  }

  ngOnInit(): void {
    window.scroll(0,0); 
    this.companyID = this.route.snapshot.params.company_id;
    this.projectID = this.route.snapshot.params.project_id; 
    this.getProjectDetails(this.companyID, this.projectID);
    this.setImageConfig();    
     
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) { 
    this.setImageConfig(); 
  }
 
  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }

  getProjectDetails(company_id, project_id){

    let params = { company_id: company_id, project_id: project_id }
 
    this.myaccount.getProjectDetails(params) 
      .subscribe((response: any) => {
        if (response.status == 200  ) { 
         
          this.projectData = response.data;
 
          this.clientId =  this.projectData.client_id;
          this.imageURL = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/';
          this.imageURLThumb = environment.uploadPath + this.clientId +'/'+ this.companyID +'/projects/thumb/';
          this.projectImages = this.projectData.images;
          
          this.projectData.architect =  (this.projectData.architect == "")? "N/A" : this.projectData.architect ;
          this.projectData.contractor =  (this.projectData.contractor == "")? "N/A" : this.projectData.contractor ;
          this.projectData.structural_engineer =  (this.projectData.structural_engineer == "")? "N/A" : this.projectData.structural_engineer ;
          this.projectData.project_year =  (this.projectData.project_year == "")? "N/A" : this.projectData.project_year ;
          this.projectData.project_cost =  (this.projectData.project_cost == "")? "N/A" : this.projectData.project_cost ;
 

          if( parseInt(this.projectData.client_id)  ==  parseInt(this.globals.token.session_id)){
            this.profileURL = "/my-account/user/me/about";
            this.isEdiatable = true;
            this.ediatableURL = this.profileURL + "/edit-project/" + this.companyID + "/" +  this.projectID
          }else{
            this.profileURL = "/user/"+this.projectData.client_id+"/"+this.projectData.provider_id+"/about"; 
            this.isEdiatable = false;
          }

          let approvedImagesOnly = [];
          let primaryImage = this.projectData.primary_img; 

          if(!this.router.url.includes('/user/me/') && !this.router.url.includes('/admin/users/')){
            approvedImagesOnly = this.projectImages.filter(x => x.approved == 1);
            primaryImage = approvedImagesOnly[0]?.file_name; 

          }else{
            approvedImagesOnly = this.projectImages; 
           
          }
  
           
          approvedImagesOnly.forEach(element => {  
            this.imagesGallery.push(new ImageItem({  src: this.imageURL+element.file_name, thumb: this.imageURLThumb+element.file_name }));
            this.images.push({ src: this.imageURL+element.file_name, thumb: this.imageURLThumb+element.file_name, approved: element.approved });
          });
          
          this.galleryRef.load(this.imagesGallery); 
          this.mainImg = this.imageURL + primaryImage;
          this.profileImg = environment.uploadPath + this.clientId +'/'+ this.companyID +'/'+ this.projectData.profie_image;

          console.log(this.mainImg,100000000)

        }else{
          
        }
          
      });

  }

  viewImage(i){
    this.mainImg = this.imageURL + this.projectImages[i].file_name; 
    this.openImageIndex = i; 
  }

  goBack(){ 
    window.history.back();
  }

  gotoProfile(){
    this.router.navigate([this.profileURL], { relativeTo: this.route.parent });
  }

  setImageConfig(){

    if(window.innerWidth < 768){
      
      this.galleryRef.setConfig({
        thumbPosition: 'bottom',
        imageSize: 'contain', 
        loop: true,
        thumb: true,
        thumbMode: "free",
        
      });
      
    }else{

      this.galleryRef.setConfig({
        thumbPosition: 'right',
        imageSize: 'cover', 
        loop: true,
        thumb: true,
        thumbMode: "free"
      }); 

    }
  }
}
