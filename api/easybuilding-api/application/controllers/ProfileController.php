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
				'columns' => 'c.*' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id', 
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
				'columns' => 'c.client_id, c.first_name, c.last_name, c.display_name, c.description, c.email' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	public function getContactDetails(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.client_id, c.address_line1, c.address_line2, c.city, c.tel1, c.tel2, c.email' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->get('auth_token').'" AND c.client_id = us.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}
	

	public function updateProfileDetails(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('clients', $dataset,'client_id="'.$this->input->post('client_id').'"');
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

	public function removeFile(){    
		
		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$file_name = $this->input->post('file_name'); 
			return $this->deleteUploadedFile($this->input->get('session_id') , $file_name);  
		}else{
			return $this->invalidSession(); 
		} 
		
	}
	 
 
}
