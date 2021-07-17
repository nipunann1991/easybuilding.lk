import { Injectable } from '@angular/core';
import { environment } from "../../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoqService {

  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));;

  constructor(private http: HttpClient) {  
   
  }

  getHouseAreasDT(){  
    let url = environment.baseUrl+'BOQController/getHouseAreasDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
 

  addHouseAreas(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/addHouseAreas?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  getSelectedHouseArea(postVals){ 

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/getSelectedHouseArea?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    
  }
  
  getHouseAreas(postVals){ 
    
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/getHouseAreas', params);
  
  }

  editHouseArea(postVals){ 

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/editHouseArea?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    
  }



  deleteHouseArea(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/deleteHouseArea?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  
  getHouseSurfaceDT(){  
    let url = environment.baseUrl+'BOQController/getHouseSurfaceDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
 

  addHouseSurface(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/addHouseSurface?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  getSelectedHouseSurface(postVals){ 

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/getSelectedHouseSurface?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    
  }


  editHouseSurface(postVals){ 

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/editHouseSurface?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    
  }



  deleteHouseSurface(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/deleteHouseSurface?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

 
  getHouseSurfaceTypeDT(){  
    let url = environment.baseUrl+'BOQController/getHouseSurfaceTypeDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
 


  getHouseSurfaces(){ 
    return this.http.get(environment.baseUrl+'BOQController/getHouseSurfaces?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
  


  addHouseSurfaceType(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/addHouseSurfaceType?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  deleteHouseSurfaceType(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/deleteHouseSurfaceType?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  getSelectedHouseSurfaceType(postVals){ 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/getSelectedHouseSurfaceType?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);  
  }


  editHouseSurfaceType(postVals){ 

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'BOQController/editHouseSurfaceType?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    
  }


  getSelectedHouseSurfaceTypeList(){
    return this.http.get(environment.baseUrl+'BOQController/getSelectedHouseSurfaceTypeList');
  }
  
}
