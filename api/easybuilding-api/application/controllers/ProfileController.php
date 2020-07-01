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
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.*' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'c.provider_id= "'.$this->input->get('provider_id').'" AND c.client_id= "'.$this->input->get('client_id').'" AND c.client_id = us.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

 

	public function getAccountDetails(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.client_id, cc.company_id, c.first_name, c.last_name, cc.display_name, cc.prof_category, cc.br_no, cc.website, cc.description, cc.email' ,   
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
				'columns' => 'c.client_id, cc.company_id, cc.address_line1, cc.address_line2, cc.city, cc.tel1, cc.tel2, cc.email' ,   
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
				'columns' => 'c.client_id, cc.company_id, cc.all_island, cc.service_areas, cc.service_dist' ,   
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

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
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

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function getServiceDistrictsByCompany(){    

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
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
			$company_id = $dataset['company_id'];

			$this->deleteData__('service_areas', 'company_id="'.$this->input->post('company_id').'"');
			$this->deleteData__('service_districts', 'company_id="'.$this->input->post('company_id').'"');
		 
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
	 
 
}
