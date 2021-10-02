import { Injectable } from '@angular/core';
import { environment } from "./../../../../../environments/environment";
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyAccountService {

  token: any = JSON.parse(localStorage.getItem('token'));
  tokenUser: any = JSON.parse(localStorage.getItem('tokenUser'));

  constructor(private http: HttpClient) { }

  setTokenData(){
    if(this.token !== null){
      this.token = JSON.parse(localStorage.getItem('token'));
      return '?auth_token='+this.token.auth_token+'&session_id='+this.token.session_id;
    }else{ 
      this.tokenUser = JSON.parse(localStorage.getItem('tokenUser'));
      return '?auth_token='+this.tokenUser.auth_token+'&session_id='+this.tokenUser.session_id;
    }
  }

  getProfileDetails(){   
    return this.http.get(environment.baseUrl+'ProfileController/getProfileDetails'+this.setTokenData());
  }
 
  getCustomProfileDetails(params){   
    return this.http.get(environment.baseUrl+'ProfileController/getCustomProfileDetails?client_id='+params.client_id+'&provider_id='+params.provider_id);
  }

  getAccountDetails(){   
      return this.http.get(environment.baseUrl+'ProfileController/getAccountDetails'+this.setTokenData());
  }
 
  getServiceDetails(){
    return this.http.get(environment.baseUrl+'ProfileController/getServiceDetails'+this.setTokenData()); 
  }

  getCities(){   
      return this.http.get(environment.baseUrl+'ProfileController/getCities');
  }

  getCitiesByDistrict(){    
    return this.http.get(environment.baseUrl+'ProfileController/getCitiesByDistrict');
  }


  getDistricts(){
    return this.http.get(environment.baseUrl+'ProfileController/getDistricts');
  } 

  getAllCategoriesData(){   
    return this.http.get(environment.baseUrl+'ProfileController/getAllCategoriesData'+this.setTokenData());
  } 

  getServiceCategories(){ 
    return this.http.get(environment.baseUrl+'ProfileController/getServiceCategories'+this.setTokenData());
  }

  getProductCategories(){ 
    return this.http.get(environment.baseUrl+'ProfileController/getProductCategories'+this.setTokenData());
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

  getServicsforAdmin(){ 
    return this.http.get(environment.baseUrl+'ImagesController/getServicsforAdmin');
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

  
  getProductDetails(postVals){   

    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/getProductDetails', params);
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
    return this.http.get(environment.baseUrl+'ProfileController/getContactDetails'+this.setTokenData());
  }
  
  updateProfileDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
      return this.http.post(environment.baseUrl+'ProfileController/updateProfileDetails'+this.setTokenData(), params);
  }

  updateProfileWithServiceArea(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 

    return this.http.post(environment.baseUrl+'ProfileController/updateProfileWithServiceArea'+this.setTokenData(), params); 
  
  }

  

  uploadCoverImage(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');
 
    return this.http.post(environment.baseUrl+'ProfileController/fileUpload'+this.setTokenData(), formData , { headers: headers });

  }

  uploadProjectImages(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/uploadProjectImages'+this.setTokenData(), formData , { headers: headers });  
  }


  uploadProjectImagesOnEdit(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/uploadProjectImagesOnEdit'+this.setTokenData(), formData , { headers: headers });
  
  }
  
 
  addNewProjectDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/addNewProjectDetails'+this.setTokenData(), params);
    
  }

  addNewProductDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/addNewProductDetails'+this.setTokenData(), params);
  
  }
  

  editProjectDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 

    return this.http.post(environment.baseUrl+'ProfileController/editProjectDetails'+this.setTokenData(), params);
 
  }


  editProductDetails(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
 
    return this.http.post(environment.baseUrl+'ProfileController/editProductDetails'+this.setTokenData(), params);
 
  }
   

  deleteProject(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 

    return this.http.post(environment.baseUrl+'ProfileController/deleteProject'+this.setTokenData(), params);
     
  }


  deleteProduct(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/deleteProductDB'+this.setTokenData(), params);
   
  }

  

  uploadProfileImage(formData){
     
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'undefined');

    return this.http.post(environment.baseUrl+'ProfileController/saveProfileImage'+this.setTokenData(), formData , { headers: headers });
   
  }

  removeCoverImage(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'ProfileController/removeCoverImage'+this.setTokenData(), params);
   
  }

  removeProjectImages(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });
 
    return this.http.post(environment.baseUrl+'ProfileController/removeProjectImages'+this.setTokenData(), params);
    
  }

  removeProductImages(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });
 
    return this.http.post(environment.baseUrl+'ProfileController/removeProductImages'+this.setTokenData(), params);
    
  }

  addNewReview(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/addNewReview'+this.setTokenData(), params);
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

      return this.http.post(environment.baseUrl+'ProfileController/uploadProductImages'+this.setTokenData(), formData , { headers: headers });
 
  }


  deleteProfile(postVals){ 
     
    const params = new HttpParams({
      fromObject : postVals
    }); 
    
    return this.http.post(environment.baseUrl+'ProfileController/deleteProfile'+this.setTokenData(), params);
  }


  resendVerification(){   
    return this.http.get(environment.baseUrl+'ProfileController/resendVerification'+this.setTokenData()); 
  } 

  getAllSubscriptionPackages(){
    return this.http.get(environment.baseUrl+'SubscriptionController/getAllSubscriptionPackages'+this.setTokenData());
  }
  

}
