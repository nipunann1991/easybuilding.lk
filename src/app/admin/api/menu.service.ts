import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from "./../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  ngOnInit() {  
    
  }

  

  getFoodCategories(): any { 
   	return	this.http.get(environment.baseUrl+'FoodController/getFoodCategories');
  }

  insertCategory(postVals){

  	const params = new HttpParams({
   		fromObject : postVals
   	});

    return this.http.post(environment.baseUrl+'FoodController/addFoodCategory', params);
  }

  editCategory(postVals){

  	const params = new HttpParams({
   		fromObject : postVals
   	});

    return this.http.post(environment.baseUrl+'FoodController/editFoodCategory', params);
  }


  deleteCategory(postVals){

    const params = new HttpParams({
       fromObject : postVals
     });

    return this.http.post(environment.baseUrl+'FoodController/deleteFoodCategory', params);
  }

   
  getFood(postVals): any { 

  	const params = new HttpParams({
   		fromObject : postVals
   	});

   	return	this.http.post(environment.baseUrl+'FoodController/getFood', params);
  }

  insertNewDish(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'FoodController/addNewDish', params);
  }


  editDish(postVals){

    const params = new HttpParams({
       fromObject : postVals
     });

    return this.http.post(environment.baseUrl+'FoodController/editDish', params);
  }

  getSingleDish(postVals): any { 

    const params = new HttpParams({
       fromObject : postVals
     });

     return  this.http.post(environment.baseUrl+'FoodController/getSingleDish', params);
  }


  deleteDish(postVals){

    const params = new HttpParams({
       fromObject : postVals
     });

    return this.http.post(environment.baseUrl+'FoodController/deleteDish', params);
  }

  insertNewOrder(postVals){

    const params = new HttpParams({
       fromObject : postVals
    });

    return this.http.post(environment.baseUrl+'FoodController/addNewOrder', params);
  }


  

}
