import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from "./../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  	constructor(
  		private http: HttpClient
  	) { }

  	getParentCategory(){
    	return this.http.get(environment.baseUrl+'ProductController/getParentCategory');
  	}

  	addNewCategory(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/addNewCategory', params);
	}


	editCategory(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/editCategory', params);
	}

	deleteCategory(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/deleteCategory', params);
	}

	getCategoryDetails(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/getCategoryDetails', params);
	}

	getCategories(){

	    let url = environment.baseUrl+'ProductController/getCategories'; 
   		return url; 
 
	}

	getAllCategories(){
    	return this.http.get(environment.baseUrl+'ProductController/getAllCategories');
  	}

  	uploadProduct(formData){

  		const headers = new HttpHeaders();
  		headers.append('Content-Type', 'undefined');

    	return this.http.post(environment.baseUrl+'ProductController/fileUpload', formData , { headers: headers });
  	}

  	addNewProduct(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/addNewProduct', params);
	}

	addProductPrice(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/addProductPrice', params);
	}


	getProducts(){

	    let url = environment.baseUrl+'ProductController/getProducts'; 
   		return url; 
 
	}

	getSingleProduct(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/getSingleProduct', params);
	}

	editProduct(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/editProduct', params);
	}

	editProductPrice(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/editProductPrice', params);
	}

	deleteProduct(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/deleteProduct', params);
	}

	removeFile(postVals){

	    const params = new HttpParams({
	       fromObject : postVals
	    });

	    return this.http.post(environment.baseUrl+'ProductController/removeFile', params);
	}

  

	
}
