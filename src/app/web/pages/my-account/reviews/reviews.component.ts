import { Component, OnInit, Input, Inject, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ActivationStart ,  RoutesRecognized,  NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ClickEvent, HoverRatingChangeEvent, RatingChangeEvent } from 'angular-star-rating';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MyAccountService } from '../../../../admin/api/frontend/my-account.service';
import { Globals } from "../../../../app.global";
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewsComponent implements OnInit {

  @Input() reviewData: any; 
  dialogRef: MatDialogRef<reviewDialog>;
  formGroup: FormGroup;
  reviews: any = [];
  isShowHeader: boolean = true;
  resultLimit: number = -1;
  clientId: any;

  constructor( 
    public dialog: MatDialog,
    private myaccount: MyAccountService,  
    private toastr: ToastrService,
    private globals: Globals,
    private route: ActivatedRoute,
    private router: Router
  ) { 

    
  }

  ngOnInit(): void {
    
    window.scroll(0,0); 
 
    if( typeof this.reviewData === 'undefined' ){
      this.isShowHeader = true 
    }else{
      this.isShowHeader = this.reviewData.header ; 
      this.resultLimit = this.reviewData.limit;
    }  
    
    this.route.parent.params.subscribe((params) => { 
      console.log(params); 
      (params.user === "me")? this.clientId = this.globals.token.session_id : this.clientId = params.user;
      
    }); 
    
     this.getReviews();
  }

  reviewDialog(){
    this.dialogRef =  this.dialog.open(reviewDialog, {
      height: 'auto',
      width: '600px', 
    });  

    this.dialogRef.afterClosed().subscribe(result => {

      console.log(result)
      
      if(result){
         
      }
      
    });
  }


  getReviews(){

    let param = { client_id: this.clientId, limit: this.resultLimit }

    this.myaccount.getReviews(param)
    .subscribe((response: any) => {
  
      if (response.status == 200) { 
        
        this.reviews = response.data
        console.log(response.data)
        
      
      } 
        
    });

  }


  gotoReview(){
    this.router.navigate(['../reviews'], { relativeTo: this.route.parent });
  }

 

  
}



@Component({
  selector: 'review-dialog',
  templateUrl: './review-dialog.html',
  styleUrls: ['./reviews.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class reviewDialog {

  formGroup: FormGroup; 
  public confirmMessage:string;
     
  constructor( 
    public dialogRef: MatDialogRef<reviewDialog>,
    private myaccount: MyAccountService, 
    private toastr: ToastrService,
    private globals: Globals,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 

    this.formGroup = new FormGroup({ 
      reviewer_name: new FormControl('', [
        Validators.required
      ]), 
      rating: new FormControl('', [
        Validators.required
      ]), 
      description: new FormControl('', [
        Validators.required
      ]),  
    });

  }


  onClick = ($event: ClickEvent) => {  
    this.setRatingWithFormValues($event.rating) 
  };

  onRatingChange = ($event: RatingChangeEvent) => {  
    this.setRatingWithFormValues($event.rating) 
  };

  onHoverRatingChange = ($event: HoverRatingChangeEvent) => { 

  };

  setRatingWithFormValues(rating){
    this.formGroup.setValue({
      reviewer_name: this.formGroup.value.reviewer_name,
      rating: rating, 
      description: this.formGroup.value.description, 
    }); 
  }
  

  onSave(){
    if (!this.formGroup.invalid) {
      
      this.formGroup.value.client_id = this.globals.token.session_id ;
      //console.log(this.formGroup.value)
      
      this.myaccount.addNewReview(this.formGroup.value)
        .subscribe((response: any) => {

          if (response.status == 200) { 
            this.toastr.success('Review saved successfully', 'Success !');   
            
          }else if (response.status == 401){
            this.toastr.error('Invalid user token or session has been expired. Please re-loging and try again.', 'Error !');  
          }else{
            this.toastr.error('Information saving failed. Please try again', 'Error !'); 
          }

          this.dialogRef.close(true);
            
        });

    }
  }
  
}
