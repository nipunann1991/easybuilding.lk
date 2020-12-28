import { Injectable } from '@angular/core';
import { environment } from "./../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  token: any = JSON.parse(localStorage.getItem('token'));
  tokenUser: any = JSON.parse(localStorage.getItem('tokenUser'));

  constructor(private http: HttpClient) { }

  getProfileDetails(){   
    return this.http.get(environment.baseUrl+'ProfileController/getProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  }
 
 
  getCustomProfileDetails(params){  
    // if( this.token == null){
    //   this.token = JSON.parse(localStorage.getItem('tokenAdmin'));
    // }
    return this.http.get(environment.baseUrl+'ProfileController/getCustomProfileDetails?client_id='+params.client_id+'&provider_id='+params.provider_id);
  }

  getAccountDetails(){  
    
    if(this.token !== null){
      console.log('getAccountDetails', this.token )
      return this.http.get(environment.baseUrl+'ProfileController/getAccountDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{ 
      this.tokenUser = JSON.parse(localStorage.getItem('tokenUser'));
      return this.http.get(environment.baseUrl+'ProfileController/getAccountDetails?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
    
  }
 
  getServiceDetails(){   

    if(this.token !== null){
      return this.http.get(environment.baseUrl+'ProfileController/getServiceDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{
      return this.http.get(environment.baseUrl+'ProfileController/getServiceDetails?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
   
  }
 

  getCities(){   

    if(this.token !== null){
      return this.http.get(environment.baseUrl+'ProfileController/getCities?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{
      return this.http.get(environment.baseUrl+'ProfileController/getCities?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
    
  }


  getDistricts(){   

    if(this.token !== null){
      return this.http.get(environment.baseUrl+'ProfileController/getDistricts?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{
      return this.http.get(environment.baseUrl+'ProfileController/getDistricts?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
   
  } 

  getAllCategoriesData(){   
    return this.http.get(environment.baseUrl+'ProfileController/getAllCategoriesData?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
  } 

  getServiceCategories(){ 
    
    if(this.token !== null){
      return this.http.get(environment.baseUrl+'ProfileController/getServiceCategories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{
      return this.http.get(environment.baseUrl+'ProfileController/getServiceCategories?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
    
  }

  getProductCategories(){   

    if(this.token !== null){
      return this.http.get(environment.baseUrl+'ProfileController/getProductCategories?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{
      return this.http.get(environment.baseUrl+'ProfileController/getProductCategories?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
   
  }
  
  getServiceCitiesByCompany(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getServiceCitiesByCompany', params);
  }

  

  getServiceDistrictsByCompany(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getServiceDistrictsByCompany', params);
  }


  getServics(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getServics', params);
  }

  getServicsWithID(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getServicsWithID', params);
  }
  

  getProductsWithID(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getProductsWithID', params);
  }
 
  
  getProjectDetails(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getProjectDetails', params);
  }

  

  getMinimalProjectDetails(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getMinimalProjectDetails', params);
  }

  getMinimalProductDetails(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getMinimalProductDetails', params);
  }
  
  getContactDetails(){  

    if(this.token !== null){
      return this.http.get(environment.baseUrl+'ProfileController/getContactDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id);
    }else{
      return this.http.get(environment.baseUrl+'ProfileController/getContactDetails?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id);
    }
     
    
  }
  
  updateProfileDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    if(this.token !== null){
      return this.http.post(environment.baseUrl+'ProfileController/updateProfileDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    }else{
      return this.http.post(environment.baseUrl+'ProfileController/updateProfileDetails?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id, params);
    }

  }

  updateProfileWithServiceArea(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 

    if(this.token !== null){
      return this.http.post(environment.baseUrl+'ProfileController/updateProfileWithServiceArea?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
    }else{
      return this.http.post(environment.baseUrl+'ProfileController/updateProfileWithServiceArea?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id, params);
    }
     
  }

  

  uploadCoverImage(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/fileUpload?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });
  }

  uploadProjectImages(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/uploadProjectImages?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });
  }


  uploadProjectImagesOnEdit(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/uploadProjectImagesOnEdit?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });
  }
 
  addNewProjectDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/addNewProjectDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addNewProductDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/addNewProductDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }
  

  editProjectDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/editProjectDetails?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  deleteProject(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/deleteProject?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  deleteProduct(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/deleteProductDB?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  

  uploadProfileImage(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/fileUpload?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });
  }

  removeCoverImage(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'ProfileController/removeCoverImage?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  removeProjectImages(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'ProfileController/removeProjectImages?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }

  addNewReview(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/addNewReview?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, params);
  }


  getReviews(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getReviews', params);
  }


  uploadProductImages(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/uploadProductImages?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id, formData , { headers: headers });
  }


  deleteProfile(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/deleteProfile?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id, params);
  }


  

}
