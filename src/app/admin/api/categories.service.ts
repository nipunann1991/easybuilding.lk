import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 
  token: any = JSON.parse(localStorage.getItem('tokenAdmin'));;

  constructor(private http: HttpClient) {  
   
  }

  getMainCategoriesDT(){  
    let url = environment.baseUrl+'CategoriesController/getMainCategoriesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

  getLvl1CategoriesDT(){  
    let url = environment.baseUrl+'CategoriesController/getLvl1CategoriesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

  getLvl2CategoriesDT(){  
    let url = environment.baseUrl+'CategoriesController/getLvl2CategoriesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
  
  getMainCategories(){   
    return this.http.get(environment.baseUrl+'CategoriesController/getMainCategories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }


  getParentLvl1Categories(){ 
    return this.http.get(environment.baseUrl+'CategoriesController/getParentLvl1Categories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
 

  addMainCategory(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/addMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addLvl1Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/addLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addLvl2Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/addLvl2Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  
  getSelectedMainCategory(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/getSelectedMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  

  getSelectedLvl1Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/getSelectedLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  

  getSelectedLvl2Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/getSelectedLvl2Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  editMainCategory(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/editMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  } 
  

  editLvl1Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/editLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  } 

  editLvl2Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/editLvl2Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  } 
  
  
  deleteMainCategory(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/deleteMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  deleteLvl1Category(postVals){
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/deleteLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  

  

  

}
