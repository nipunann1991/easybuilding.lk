<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class ProfileController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	 
	
	 public function getProfileDetails(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.*, cc.*' ,   
				'table' => 'user_sessions us, clients c, client_company cc',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id AND c.client_id = cc.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function getCompanyData(){  
   
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'company_details',
			'eq_table_col' => '1',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
		
	}


	 public function getReviews(){  

	 	$limit = "";
 
	 	if($this->input->post('limit') != 3){  
	 		$limit = "LIMIT ".$this->input->post('limit') * ($this->input->post('page_index') - 1) ." , ".$this->input->post('limit') ."";  
	 	}else{
	 		$limit = "LIMIT 3"; 
	 	}
   
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'reviews',
			'eq_table_col' => "1 ORDER BY review_id DESC ".$limit,
			'data' => 'client_id= "'.$this->input->post('client_id').'"', 
		);

		$dataset = $this->selectRawCustomData__($search_index);

		$get_data_count = array(
			'columns' => '*' ,   
			'table' => 'reviews',
			'eq_table_col' => "1",
			'data' => 'client_id= "'.$this->input->post('client_id').'"', 
		);

		 

		$data = array( 
			'status' => 200, 
			'data' => $dataset["data"], 
			'total_results' => $this->CommonQueryModel->count_filtered($get_data_count)
		);
		
		return $this->returnJSON($data);  
 
		 
		
	}

	public function getCities(){  
   
		$search_index = array(
			'columns' => 'city_id AS id, city AS text' ,   
			'table' => 'cites',
			'eq_table_col' => '1 order by city ASC',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
		
	}


	public function getDistricts(){  
   
		$search_index = array(
			'columns' => 'district_id AS id, district_name AS text' ,   
			'table' => 'districts',
			'eq_table_col' => '1 order by district_name ASC',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
		
	}

	


	public function getCustomProfileDetails(){  
 		 

		$search_index = array(
			'columns' => 'c.*, cc.*' ,   
			'table' => 'user_sessions us, clients c, client_company cc',
			'eq_table_col' => '1',
			'data' => 'c.client_id = us.client_id AND c.client_id = cc.client_id AND c.provider_id= "'.$this->input->get('provider_id').'" AND c.client_id= "'.$this->input->get('client_id').'"', 
		);
 
		return $this->selectCustomData__($search_index); 
		
	}

 

	public function getAccountDetails(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.client_id, cc.company_id, c.first_name, c.last_name , cc.display_name, cc.prof_category, cc.br_no, cc.website, cc.description, cc.email, cc.company_profile' ,   
				'table' => 'user_sessions us, clients c, client_company cc',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id AND c.client_id = cc.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	public function getContactDetails(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.client_id, c.email AS signup_email, cc.company_profile, cc.company_id, cc.address_line1, cc.address_line2, cc.city, cc.tel1, cc.tel2, cc.email' ,   
				'table' => 'user_sessions us, clients c, client_company cc',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id AND c.client_id = cc.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function getServiceDetails(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.client_id, cc.company_id, cc.all_island, cc.service_areas, cc.service_dist, cc.services' ,   
				'table' => 'user_sessions us, clients c, client_company cc',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id AND c.client_id = cc.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function getServiceCitiesByCompany(){    

		 
			$search_index = array(
				'columns' => 'c.city' ,   
				'table' => 'service_areas sa, cites c',
				'eq_table_col' => 'c.city_id = sa.city_id ',
				'data' => 'sa.company_id= "'.$this->input->post('company_id').'"', 
			);
 
			$dataset = $this->selectRawCustomData__($search_index);
			$cities = array();

			foreach ($dataset["data"] as $value) { 
				array_push($cities, $value->city);
			}

			$data = array( 
				'status' => 200, 
				'data' => implode(", " , $cities), 
			);
			
			return $this->returnJSON($data);  
		
	}


	public function getServiceDistrictsByCompany(){    

		 
		$search_index = array(
			'columns' => 'd.district_name' ,   
			'table' => 'service_districts sd, districts d',
			'eq_table_col' => 'd.district_id = sd.district_id ',
			'data' => 'sd.company_id= "'.$this->input->post('company_id').'"', 
		);

		$dataset = $this->selectRawCustomData__($search_index);
		$district = array();

		foreach ($dataset["data"] as $value) { 
			array_push($district, $value->district_name);
		}

		$data = array( 
			'status' => 200, 
			'data' => implode(", " , $district), 
		);
		
		return $this->returnJSON($data);  
		
	}


	public function getServics(){    

		 
			$search_index = array(
				'columns' => 'cl2.cat_lvl2_name' ,   
				'table' => 'services_list sl, `categories-level2` cl2',
				'eq_table_col' => 'cl2.cat_lvl2_id = sl.cat_lvl2_id ',
				'data' => 'sl.company_id= "'.$this->input->post('company_id').'"', 
			);
 
			$dataset = $this->selectRawCustomData__($search_index);
			$services = array();

			foreach ($dataset["data"] as $value) { 
				array_push($services, $value->cat_lvl2_name);
			}

			$data = array( 
				'status' => 200, 
				'data' => implode(", " , $services), 
			);
			
			return $this->returnJSON($data);  
		
	}


	public function getServicsWithID(){    

		 
			$search_index = array(
				'columns' => 'cl2.cat_lvl2_id AS id, cl2.cat_lvl2_name AS text' ,   
				'table' => 'services_list sl, `categories-level2` cl2',
				'eq_table_col' => 'cl2.cat_lvl2_id = sl.cat_lvl2_id ',
				'data' => 'sl.company_id= "'.$this->input->post('company_id').'"', 
			);
 
			return $this->selectCustomData__($search_index);
		 
		
	}
	

	public function getProjectDetails(){   

		$search_index = array(
			'columns' => 'p.*, cc.client_id, cc.display_name, cc.total_reviews, cc.profie_image, c.provider_id' ,   
			'table' => 'project p, client_company cc, clients c',
			'eq_table_col' => '1',
			'data' => 'p.company_id= "'.$this->input->post('company_id').'" AND p.project_id= "'.$this->input->post('project_id').'" AND cc.company_id=p.company_id AND cc.client_id=c.client_id', 
		);

		$data = $this->selectRawCustomData__($search_index); 

		$getProjectCat = array(
			'columns' => 'cl2.cat_lvl2_name' ,   
			'table' => 'project_category pc, `categories-level2` cl2',
			'eq_table_col' => 'pc.cat_lvl2_id = cl2.cat_lvl2_id ',
			'data' => 'pc.project_id= "'.$this->input->post('project_id').'"', 
		);

		$getProjectCat = $this->selectRawCustomData__($getProjectCat);
		$project_category = array();

		foreach ($getProjectCat["data"] as $value) { 
			array_push($project_category, $value->cat_lvl2_name);
		} 
 
		$data['data'][0]->project_category = $project_category;

		$data = array( 
			'status' => 200, 
			'data' => $data['data'][0], 
		);
		
		return $this->returnJSON($data);   
		
	}

	public function getProjectImages(){   

		$search_index = array(
			'columns' => 'file_name' ,   
			'table' => 'project_images',
			'eq_table_col' => '1',
			'data' => 'project_id= "'.$this->input->post('project_id').'"', 
		);

		return $this->selectRawCustomData__($search_index); 
		
	}


	public function getMinimalProjectDetails(){  
  

		$limit = "";

		if ($this->input->post('limit') != -1) {
			$limit = 'Limit '.$this->input->post('limit').'';
		}

		$search_index = array(
			'columns' => 'project_id, project_name, project_year, primary_img, total_imgs' ,   
			'table' => 'project',
			'eq_table_col' => '1 order by project_id DESC '.$limit,
			'data' => 'company_id= "'.$this->input->post('company_id').'"', 
		);

		return $this->selectCustomData__($search_index);
 
		
	}


	public function getAllCategoriesData(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$search_lvl1 = array(
				'columns' => 'cat_lvl1_id, cat_lvl1_name' ,   
				'table' => '`categories-level1`',
				'eq_table_col' => '1 order by cat_lvl1_name ASC',
				'data' => '1', 
			);

			$dataset = $this->selectRawCustomData__($search_lvl1);
			$all_categories = array(); 

			foreach ($dataset["data"] as $value) {   

				$search_lvl2 = array(
					'columns' => 'cat_lvl2_id AS id, cat_lvl2_name AS text' ,   
					'table' => '`categories-level2`',
					'eq_table_col' => '1 order by cat_lvl2_name ASC',
					'data' => 'parent_cat_id="'.$value->cat_lvl1_id.'"', 
				);

				$dataset_lvl2 = $this->selectRawCustomData__($search_lvl2);

				$sub_categories = array(
					'id' => $value->cat_lvl1_id , 
					'text' => $value->cat_lvl1_name , 
					'children' => $dataset_lvl2['data'] 
				);

				array_push($all_categories, $sub_categories);
				
			}
			
			$data = array( 
				'status' => 200, 
				'data' => $all_categories, 
			);
			
			return $this->returnJSON($data);   
			

		}else{
			return $this->invalidSession(); 
		}
		
	}
 

	public function updateProfileDetails(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('client_company', $dataset, 'company_id="'.$this->input->post('company_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	} 

	public function updateProfileWithServiceArea(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
  
			$service_areas = json_decode($dataset['service_areas']);
			$service_dist = json_decode($dataset['service_dist']);
			$services = json_decode($dataset['services']);

			$company_id = $dataset['company_id']; 

			$this->deleteData__('service_areas', 'company_id="'.$this->input->post('company_id').'"');
			$this->deleteData__('service_districts', 'company_id="'.$this->input->post('company_id').'"');
			$this->deleteData__('services_list', 'company_id="'.$this->input->post('company_id').'"');
		 	
		 	$this->insertServices($services, $company_id);

			if ($dataset['service_areas'] != "[]") {
				$this->insertServiceAreas($service_areas, $company_id);

			}else if ($dataset['service_dist'] != "[]"){
				$this->insertServiceDistricts($service_dist, $company_id);
				
			} 


			 
			return $this->updateData__('client_company', $dataset, 'company_id="'.$this->input->post('company_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	} 

	public function insertServiceAreas($service_areas, $company_id){  

 		foreach ($service_areas as $value) {

			$dataset = array(
				'city_id' => $value , 
				'company_id' => $company_id , 
			);
 

			$this->insertData__('service_areas', $dataset);
		    	
		} 
	}
 
	public function insertServiceDistricts($service_areas, $company_id){  

 		foreach ($service_areas as $value) {

			$dataset = array(
				'district_id' => $value , 
				'company_id' => $company_id , 
			);
 

			$this->insertData__('service_districts', $dataset);
		    	
		} 
	} 


	public function insertServices($services, $company_id){  

 		foreach ($services as $value) { 

			$dataset = array(
				'cat_lvl2_id' => $value, 
				'company_id' => $company_id , 
			); 

			$this->insertData__('services_list', $dataset); 
		} 
	} 

	public function insertProjectCategory($services, $project_id){  

 		foreach ($services as $value) { 

			$dataset = array(
				'cat_lvl2_id' => $value, 
				'project_id' => $project_id , 
			); 

			$this->insertData__('project_category', $dataset); 
		} 
	} 



	public function addNewProjectDetails(){  

 		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();

			$imageList = json_decode($dataset["images"]);

			$result = $this->insertRawData__('project', $dataset);
			$project_id = $result["data"]->insertedId; 

			foreach ($imageList as $image) { 

				$dataset_imgs = array(
					'file_name' => $image, 
					'project_id' => $project_id, 
				); 

				$this->insertData__('project_images', $dataset_imgs);  
			}  

			$data = array( 
				'status' => 200, 
				'data' => $result["data"]->message, 
			);
			
			return $this->returnJSON($data);
 

		}else{
			return $this->invalidSession(); 
		}
		 
	} 
	

	public function editProjectDetails(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 

			$services = json_decode($dataset['services']);  
			$project_id = $this->input->post('project_id'); 

			$this->deleteData__('project_category', 'project_id="'.$project_id.'"');  

			if ($dataset['services'] != "[]") {
				$this->insertProjectCategory($services, $project_id); 
			}  

			return $this->updateData__('project', $dataset, 'project_id="'.$this->input->post('project_id').'"'); 
			 
		}else{
			return $this->invalidSession(); 
		} 

	} 
	

	public function deleteProduct(){   
		$this->deleteData__('product_prices','product_id="'.$this->input->post('product_id').'"');
		return $this->deleteData__('product','product_id="'.$this->input->post('product_id').'"');  
	}

	public function fileUpload(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
			return $this->saveCoverImage__( $this->input->get('session_id'), $_POST, $_FILES);
		}else{
			return $this->invalidSession(); 
		}  
 
	} 


	public function uploadProjectImages(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
			return $this->uploadProjectImages__( $this->input->get('session_id'), $_POST, $_FILES, false);
		}else{
			return $this->invalidSession(); 
		}  
 
	} 

	public function uploadProjectImagesOnEdit(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {  

			$result = json_decode($this->uploadProjectImages__( $this->input->get('session_id'), $_POST, $_FILES, true));

			$dataset_imgs = array(
				'file_name' => $result->data->new_file, 
				'project_id' => $_POST['project_id'], 
			); 

			$this->insertData__('project_images', $dataset_imgs); 

			return $this->output->set_output(json_encode($result, JSON_PRETTY_PRINT));

		}else{
			return $this->invalidSession(); 
		}  
 
	} 

	public function removeCoverImage(){    
		
		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$file_name = $this->input->post('file_name'); 
			$company_id = $this->input->post('company_id'); 
			$client_id = $this->input->post('client_id'); 
			
			return $this->deleteUploadedFile($client_id, $company_id , $file_name);  
		}else{
			return $this->invalidSession(); 
		} 
		
	}


	public function removeProjectImages(){    
		
		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$file_name = $this->input->post('file_name'); 
			$company_id = $this->input->post('company_id'); 
			$client_id = $this->input->get('session_id'); 

			$this->deleteData__('project_images','file_name="'.$file_name.'"');  

			return $this->deleteProjectImages($client_id, $company_id , $file_name); 

		}else{
			return $this->invalidSession(); 
		} 
		
	}


	public function deleteProject(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) { 

			$company_id = $this->input->post('company_id'); 
			$project_id = $this->input->post('project_id');  
			$client_id = $this->input->get('session_id'); 

			$files = $this->getProjectImages(); 

			foreach ($files["data"] as $image) {  
				$this->deleteProjectImages($client_id, $company_id , $image->file_name);  
			} 

			$this->deleteData__('project_images','project_id="'. $project_id .'"');

			return $this->deleteData__('project','project_id="'. $project_id .'" AND company_id="'. $company_id .'"');

		}else{
			return $this->invalidSession(); 
			
		} 
		
	}

	public function addNewReview(){  

 		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			$this->insertData__('reviews', $dataset); 

			$total_reviews = $this->getTotalReviewsByUser();
			$total_sum_reviews = $this->getTotalSumofReviewsByUser();

			$rating = (int) $total_sum_reviews / (int) $total_reviews;

			$dataset = array( 
				'rating' => $rating, 
				'total_reviews' => $total_reviews , 
			);

			return $this->updateData__('client_company', $dataset, 'client_id="'.$this->input->post('client_id').'"'); 

		}else{
			return $this->invalidSession(); 
		}
		 
	} 


	public function getTotalReviewsByUser(){

    	$search = array(
			'table' => 'reviews',
			'columns' => '*', 
			'data' => " client_id = '".$this->input->post('client_id')."'",
		);


		$result = $this->getTotalCount__($search); 

		return $result;

    }

    public function getTotalSumofReviewsByUser(){

    	$search = array(
			'table' => 'reviews',
			'column' => 'rating',
			'data' => " client_id = '".$this->input->post('client_id')."'",
			 
		);


		$result = $this->getSumOfColumn__($search); 

		return $result;

    }
	 
 
}
