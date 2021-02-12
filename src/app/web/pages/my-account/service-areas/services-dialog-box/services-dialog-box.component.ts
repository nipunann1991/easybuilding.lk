import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OverlayScrollbarsComponent } from "overlayscrollbars-ngx";

@Component({
  selector: 'app-services-dialog-box',
  templateUrl: './services-dialog-box.component.html',
  styleUrls: ['./services-dialog-box.component.scss']
})
export class ServicesDialogBoxComponent implements OnInit {

  popupData: any;
  title: string = "";
  totalLinks: number = 0;
  menuArray: any = [];
  menuItems: any = []; 
  selectedVals: any = [];

  constructor( 
    public dialogRef: MatDialogRef<ServicesDialogBoxComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ServicesDialogBoxComponent) {
      this.popupData = data;  
      this.title = (this.popupData.view_id == 1)? "Service" : 'Products';
      let menuArray = this.setMenuItems(this.popupData.data, 20)
      this.menuItems = this.generateMegaMenu(menuArray);
      this.selectedVals = this.popupData.selected;
 
  }
    
  ngOnInit(): void {
  
  }

  onConfirm(): void { 
    this.dialogRef.close(this.selectedVals);
  }

  onDismiss(): void { 
    this.dialogRef.close(false);
  }

  setMenuItems(res,  maxItems = 10, breakLine = true): any{
    let parentCat = ""
    let parentCatName = ""
    let menuItem = [];
    let menuArray = []; 
    let breapoint = true;
    let count = 1; 
    let maxLength = maxItems; 
    let isLineBreak = false; 
    this.totalLinks = 0;

    res.data.forEach((elm, index) => {  
      
      if(breakLine){
        isLineBreak = (count >= maxLength )
      } 

      if(parentCat != elm.parent_cat_id || isLineBreak || res.data.length == (index + 1)){ 
        parentCat = elm.parent_cat_id;  
         
        (menuItem.length != 0)? menuArray.push({ 
          id: this.menuArray.length, 
          title: parentCatName, 
          break: breapoint,
          children: menuItem 
        }) : '';
        
        this.totalLinks =  this.totalLinks + menuItem.length ;
        
        menuItem = []; 
        count = 1;
      } 

      parentCatName = elm.cat_lvl1_name;  
       
      menuItem.push({ id: elm.id ,title: elm.cat_lvl2_name, lvl2_id: elm.cat_lvl2_id , url: "products/"+elm.cat_lvl2_id });
      count++;   

    }); 

    return menuArray;

  }


  generateMegaMenu(menuArray): any{

    let groupedMenu = [];
    let oldMenu = menuArray;
    let newMenu = [];
    let lengthCount = 0;
    let totalCount = 0; 
    let column = 0; 
    let totalCols = menuArray.length 
    let maxCols = 3

    
    console.log(menuArray, menuArray.length )

    let noOfItemsPerCol =  Math.round(this.totalLinks / maxCols); 

    oldMenu.forEach((element, index) => {  

      if((totalCols <= maxCols)){

        groupedMenu.push(element); 
        newMenu.push(groupedMenu); 
        groupedMenu = [];
        lengthCount = 0;
        column++;
       

      }else{

        if( lengthCount < noOfItemsPerCol && menuArray.length != (index + 1)){ 
          groupedMenu.push(element);
  
        }else{ 
          newMenu.push(groupedMenu); 
          groupedMenu = [];
          lengthCount = 0;
          column++;
          groupedMenu.push(element); 
         
        }  
  
        if(menuArray.length == (index + 1)){
          (newMenu.length < maxCols)? newMenu.push(groupedMenu) : newMenu[(maxCols - 1)].push(...groupedMenu);
        }

      } 
        
      lengthCount = lengthCount + element.children.length;
      totalCount = totalCount + element.children.length; 
       
    });
     
    return newMenu; 
    
  }

  setValue(e: any, val: string){
    (e.target.checked)? this.selectedVals.push(val) : this.selectedVals.splice(this.selectedVals.indexOf(val) , 1) ;
    
  }

  

}
