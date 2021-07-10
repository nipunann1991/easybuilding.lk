import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../../environments/environment";
import { Options } from 'select2';
import { Subject } from 'rxjs'
import { BoqService } from "../../../admin/api/boq.service"; 
import { Globals } from "../../../app.global";
import { count } from 'rxjs/operators';
import { AppSEO } from "./../../../app.seo";

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
  value:  Array<any> = ['0','0','0','0', '0'];
  totalAmount: number = 0;
  areaSelected: boolean = false;
  selectedHouseArea:  string = "";
  surfacesCol: any = []
  tableHeaderCols: any = ['House Area', 'Width', 'Length', 'Area'];
  tableCols: any = [];
  tableColsLevel1: any = [];
  tableColsLevel2: any = [];
  houseLevel = [{ id: 1, text: "Downstairs"}, { id: 2, text: "Upstairs"}]
  houseAreaSqFt: number = 0;
  totalCost: any = {};
  currency = this.globals.currencyAlias;
  surfaceData: any;
  surfaceTypeList: any;
  areaCount = {
    width: 0,
    height: 0
  }

  constructor(
    private boq: BoqService,
    private toastr: ToastrService, 
    private globals: Globals,
    private seo: AppSEO,
  ) { 
    this.pageSEO(); 
  }

  ngOnInit(): void {

    window.scroll(0,0); 
    this.getSelectedHouseSurfaceTypeList();

    this.formGroup = new FormGroup({ 

      house_level: new FormControl('', [
        Validators.required, 
      ]),

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

    let boqEstimates = localStorage.getItem("boq-estimate");

    // if(boqEstimates != null){
    //   this.tableCols = JSON.parse(boqEstimates);
    //   this.setLevelData();
    //   this.totalAmountBOQ(); 
    // } 
    
  }


  getHouseAreas(level): void{

    let param = { level: level }
     
     this.boq.getHouseAreas(param)
         .subscribe((response: any) => {

        if (response.status == 200) { 
         
            let data = [];

            response.data.forEach( (value, index) => {  

              console.log(value)
              data.push({ 
                id: [value.cost_factor, value.house_area],
                text: value.house_area
              });

              this.houseArea = data;

              this.filterSurcfaceType(level);

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
          let surfaces = [];
          this.surfacesCol.filter( x => {
            surfaces.push(x.replace("Type", "")) 
          })
 
          this.tableHeaderCols = [...this.tableHeaderCols, ...surfaces, 'Total (Rs.)']; 
          this.surfaceData =  response.data;
 
          
        }else{
            
        }
           
    });   

 }

  filterSurcfaceType(i){
    this.surfaces =[];

    let surfaceData =  this.surfaceData.filter(x => x.level == i );


    this.surfaceTypeList =  surfaceData.reduce(function (r, a) {
      r[a.surface_type] = r[a.surface_type] || [];
      r[a.surface_type].push({id: [a.value, a.house_surfaces_type], text: a.house_surfaces_type });
      return r;
  }, Object.create(null));
    
    let surfaceType =  surfaceData.map(item => item.surface_type).filter((value, index, self) => self.indexOf(value) === index)
 
    surfaceType.forEach( (value, index) => {    
 
      this.surfaces.push({ 
        surface_type: value,
        children: this.surfaceTypeList[value]   
      });
      
      //set Fixed Value
      this.value[4] = this.surfaceTypeList[value][0].id.join(',')
       
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
      selectedText = [ this.formGroup.value.house_area.split(',')[1], this.areaCount.width, this.areaCount.height, this.areaCount.width * this.areaCount.height, ...selectedText, (this.totalAmount * this.areaCount.width * this.areaCount.height * this.formGroup.value.house_area.split(',')[0] ), this.formGroup.value.house_level ]
     
      this.tableCols.push({ selectedText }); 

      this.setLevelData();  
      this.totalAmountBOQ();
      this.saveBOQ(); 
       
      this.value  = ['0','0','0','0', "0"]; 
      this.selectedHouseArea = "";
      this.areaCount = { width: 0, height: 0 };
      this.resetFieldValues()

 
    }else{
      this.toastr.error('House area should not be 0', 'Error !'); 

    }
    
        
}


  totalAmountBOQ(){
    if (this.tableCols.length != 0 )
      this.totalCost.total = this.tableCols.map(elm => elm.selectedText[9]).reduce((a, b) => a + b); 

      if(this.tableColsLevel1.length != 0)
        this.totalCost.level1 = this.tableColsLevel1.map(elm => elm.selectedText[9]).reduce((a, b) => a + b);
        this.totalCost.level1Sq = this.tableColsLevel1.map(elm => elm.selectedText[3]).reduce((a, b) => a + b, 0);

      if(this.tableColsLevel2.length != 0)
        this.totalCost.level2 = this.tableColsLevel2.map(elm => elm.selectedText[9]).reduce((a, b) => a + b);
        this.totalCost.level2Sq = this.tableColsLevel2.map(elm => elm.selectedText[3]).reduce((a, b) => a + b, 0);

    console.log(this.totalCost)
  }

  saveBOQ(){  
    localStorage.setItem("boq-estimate", JSON.stringify(this.tableCols))
  }

  setLevelData(){
    this.tableColsLevel1 = [];
    this.tableColsLevel2 = [];

    this.tableCols.filter((x, i)=> {
      x.index = i;
      (x.selectedText[x.selectedText.length - 1] == 1)?  this.tableColsLevel1.push(x) : this.tableColsLevel2.push(x);
    })

   
  }

  selectedItem(e){
    
    console.log(e, this.value)
  }

  houseAreaSelected(e){ 
    this.selectedHouseArea = e;
    this.areaSelected = true
  } 

  selectedHouseAreaString(text){
    return text.split(',')[1]
  }

  houseLevelSelected(index){ 
    this.selectedHouseArea = index;   
    this.resetFieldValues(true);
  
    this.getHouseAreas(index);
    
  } 

  resetFieldValues(isHouseLevelSelected = false){

    if(!isHouseLevelSelected){
      this.formGroup.controls["house_level"].setValue(""); 
      this.formGroup.controls["house_level"].validator = null;
    }
    
    this.formGroup.controls["house_area"].setValue("");
    this.formGroup.controls["house_area"].validator = null;
    this.formGroup.controls["width"].setValue(0);
    this.formGroup.controls["height"].setValue(0);
  }

  removeField(index, i){  

    if(index == 1){ 
      this.tableCols.splice(this.tableColsLevel1[i].index, 1)
      this.tableColsLevel1.splice(i, 1)
       
    }else if(index == 2){
      this.tableCols.splice(this.tableColsLevel2[i].index, 1)
      this.tableColsLevel1.splice(2, 1) 
    } 

    this.setLevelData();
    this.totalAmountBOQ()
    this.saveBOQ();
  }
    
  pageSEO() : void{
    let seoData = {
      title: 'EasyBuilding.lk | BOQ',
      keywords: 'Construction Services in Colombo Galle Kalutara Gampaha Srilanka,Vehicle A/C Repairs, Electrician,Plumber Colmbo Srilanka,Tile Services, Construction Deals,Mason baas,House builders Srilanka,ManPower,WorkForce,Construction Services, Construction Rates, BOQ, Quotation Requests, Construction Deals,Easybuilding, Easybuilding.lk, Easybuilding Deals, Own Quotation Requests, House construction, Building construction, Contrcators, inteiror, plumbers, Painters,  architects, structural engineers, civil construction, repair',
      description: 'We are a leading online House and Building construction market place connecting potential house and commercial building construction clients with quality and reliable construction companies, individual contractors, masons, plumbers, electricians, and construction and interior material suppliers.',
      image: ''
    }

    this.seo.setSEOData(seoData)
  }

}
