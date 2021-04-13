import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../../environments/environment";
import { Options } from 'select2';
import { Subject } from 'rxjs'
import { BoqService } from "../../../admin/api/boq.service"; 
import { Globals } from "../../../app.global";
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-create-boq',
  templateUrl: './create-boq.component.html',
  styleUrls: ['./create-boq.component.scss']
})
export class CreateBoqComponent implements OnInit {

  select2Options: Options;
  formGroup: FormGroup;
  houseArea: any = []
  surfaces: any = []
  value:  Array<any> = ['0','0','0','0'];
  totalAmount: number = 0;
  areaSelected: boolean = false;
  selectedHouseArea:  string = "";
  surfacesCol: any = []
  tableHeaderCols: any = ['House Area', 'Width', 'Height', 'Area'];
  tableCols: any = [];
  houseAreaSqFt: number = 0;
  totalCost: number = 0;
  currency = this.globals.currencyAlias;
  areaCount = {
    width: 0,
    height: 0
  }

  constructor(
    private boq: BoqService,
    private toastr: ToastrService, 
    private globals: Globals,
  ) { }

  ngOnInit(): void {

    this.getHouseAreas();
    this.getSelectedHouseSurfaceTypeList();

    this.formGroup = new FormGroup({ 
      house_area: new FormControl('', [
        Validators.required, 
      ]),

      width: new FormControl('', [ 
          Validators.required, 
      ]),
      
      
      height: new FormControl('', [ 
        Validators.required, 
      ]),

    }); 

    
  }


  getHouseAreas(): void{
     
     this.boq.getHouseAreas()
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
            let data = [];

            response.data.forEach( (value, index) => {  

              data.push({ 
                id: value.house_area,
                text: value.house_area
              });

              this.houseArea = data;
            });
 

         }else{
             
         }
            
     }); 

  }


  valueChangeFn(e){
    this.houseAreaSqFt = this.areaCount.width * this.areaCount.height
  }


  getSelectedHouseSurfaceTypeList(): void{
     
    this.boq.getSelectedHouseSurfaceTypeList()
        .subscribe((response: any) => {

       if (response.status == 200) { 

          let surface_type = "";
          let count = 0;

          this.surfacesCol = response.data.map(elm => elm.surface_type ).filter((value, index, self) => (self.indexOf(value) === index))
          
          this.tableHeaderCols = [...this.tableHeaderCols, ...this.surfacesCol, 'Total']
          console.log( this.tableHeaderCols );

          let surfaceData =  response.data;

          let surfaceTypeList = surfaceData.reduce(function (r, a) {
              r[a.surface_type] = r[a.surface_type] || [];
              r[a.surface_type].push({id: [a.value, a.house_surfaces_type], text: a.house_surfaces_type });
              return r;
          }, Object.create(null));

          
          let surfaceType =  surfaceData.map(item => item.surface_type).filter((value, index, self) => self.indexOf(value) === index)
    
          surfaceType.forEach( (value, index) => {   
            console.log(surfaceTypeList[value]); 
            this.surfaces.push({ 
              surface_type: value,
              children: surfaceTypeList[value]   
            });
          });

          // response.data.forEach( (value, index) => {   
 
          //   if(index == 0 || surface_type != value.surface_type_id){  
          //     surface_type = value.surface_type_id; 

          //     this.surfaces.push({ 
          //       surface_type: value.surface_type, 
          //       children: [{id: [value.value, value.house_surfaces_type], text: value.house_surfaces_type }]  
          //     });

          //     this.formGroup.addControl(this.surfaces[count].surface_type, new FormControl('', Validators.required));

          //     if( surface_type != value.surface_type_id){
          //       count++; 
          //     }

          //   }else if( surface_type == value.surface_type_id){ 
          //     this.surfaces[count].children.push({id: [value.value, value.house_surfaces_type], text: value.house_surfaces_type })
            
          //   }else{
 

          //   }
             
            
          // });

          console.log(this.surfaces)


          
        }else{
            
        }
           
    }); 

    
  

 }

 onSubmit() {  

    if(this.houseAreaSqFt != 0){
      let selectedVal = [];
      let selectedText = [];

      this.value.filter(elm => elm.split(',') )

      this.value.forEach( (value, index) => {    
        selectedVal.push(value.split(',')[0]) 
        selectedText.push(value.split(',')[1]); 
      });
    
      this.totalAmount = selectedVal.map(elm => + elm ).reduce((a, b) => a + b)
      selectedText = [this.formGroup.value.house_area, this.areaCount.width, this.areaCount.height, this.areaCount.width * this.areaCount.height, ...selectedText, (this.totalAmount * this.areaCount.width * this.areaCount.height) ]
      this.tableCols.push({ selectedText }); 
      this.totalAmountBOQ();
       
      this.value  = ['0','0','0','0']; 
      this.selectedHouseArea = "";
      this.areaCount = { width: 0, height: 0 };
 
    }else{
      this.toastr.error('House area should not be 0', 'Error !'); 

    }
    
        
}


  totalAmountBOQ(){
    this.totalCost = this.tableCols.map(elm => elm.selectedText[8]).reduce((a, b) => a + b);
  }

  selectedItem(e){
    console.log(e)
  }

  houseAreaSelected(e){ 
    this.selectedHouseArea = e;
    this.areaSelected = true
  } 

  removeField(i){ 
    this.tableCols.splice(i, 1)
    this.totalAmountBOQ();
  }
    
  

}
