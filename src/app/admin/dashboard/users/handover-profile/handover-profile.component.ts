import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClientsService } from '../../client-profiles/services/clients.service';
import { ToastrService } from 'ngx-toastr';
import { Globals } from "../../../../app.global";

@Component({
  selector: 'app-handover-profile',
  templateUrl: './handover-profile.component.html',
  styleUrls: ['./handover-profile.component.css']
})
export class HandoverProfileComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<HandoverProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private clients: ClientsService,
    private toastr: ToastrService,
    private globals: Globals,
  ) { 
     
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({  
      first_name: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),
      last_name: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),
      email: new FormControl('', [ 
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [ 
        Validators.required,
        Validators.maxLength(300)
      ]),
    }); 
  }


  onDismiss(){
    this.dialogRef.close(false);
  }

  onSubmit(){
    
    if (!this.formGroup.invalid) {   
      
      this.dialogRef.close();

      const dialogRef = this.globals.confirmPasswordDialog('');
      dialogRef.afterClosed().subscribe(result => {

        if(result){

          let params = { client_id: this.data.client_id, ...this.formGroup.value }; 
          this.clients.transferUserProfile(params).subscribe({
            next: res =>{
              this.toastr.success('Profile has been transfered successfully.', 'Success !');   
            },
            error: err =>{
      
            } 
          });

        }
        
      });  
      
    }   
    
  }

}
