import { Injectable } from '@angular/core';
import { environment } from "./../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
 
  token: any = {};

  constructor(private http: HttpClient) {  
   
  }

  getMainCategoriesDT(){ 
    this.token = JSON.parse(localStorage.getItem('token')); 
    let url = environment.baseUrl+'CategoriesController/getMainCategoriesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

  getLvl1CategoriesDT(){ 
    this.token = JSON.parse(localStorage.getItem('token')); 
    let url = environment.baseUrl+'CategoriesController/getLvl1CategoriesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }

  getLvl2CategoriesDT(){ 
    this.token = JSON.parse(localStorage.getItem('token')); 
    let url = environment.baseUrl+'CategoriesController/getLvl2CategoriesDT?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id; 
   	return url;  
  }
  
  getMainCategories(){  
    this.token = JSON.parse(localStorage.getItem('token')); 
    return this.http.get(environment.baseUrl+'CategoriesController/getMainCategories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }


  getParentLvl1Categories(){  
    this.token = JSON.parse(localStorage.getItem('token')); 
    return this.http.get(environment.baseUrl+'CategoriesController/getParentLvl1Categories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
 

  addMainCategory(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/addMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addLvl1Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/addLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addLvl2Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/addLvl2Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  
  getSelectedMainCategory(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/getSelectedMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  

  getSelectedLvl1Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/getSelectedLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  

  getSelectedLvl2Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/getSelectedLvl2Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  editMainCategory(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/editMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  } 
  

  editLvl1Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/editLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  } 

  editLvl2Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/editLvl2Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  } 
  
  
  deleteMainCategory(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/deleteMainCategory?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  deleteLvl1Category(postVals){
    this.token = JSON.parse(localStorage.getItem('token')); 
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'CategoriesController/deleteLvl1Category?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  

  

  

}
