<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class SettingsController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	 
	
	public function getCompanyDetails(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'company_details',
				'eq_table_col' => '1',
				'data' => '1', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function getSlides(){  
   
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'home_slider',
			'eq_table_col' => '1',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
	}

	
	public function getSingleAdminUser(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'users',
				'eq_table_col' => '1',
				'data' => 'user_id= "'.$this->input->post('user_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	public function getAdminUsersDT(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('user_email', 'client_id', 'password', 'role_name'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; 
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'u.*, r.*' ,   
				'table' => 'users u, roles r',
				'data' => 'u.role_id=r.role_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			);  
		
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'users',
				'data' => '1',
			);  
			  
			$data = json_decode($this->selectCustomData__($search1)->final_output, true);
 
	 		  
			$result = (object) array(
				'draw' => intval($this->input->get('draw')),
				'recordsTotal' => $this->CommonQueryModel->count_filtered($get_data),
				'recordsFiltered' => $this->CommonQueryModel->count_filtered($get_data),
				"data" => $data['data'] 

			);  
	   		
	   		return $this->returnJSON($result);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	

	public function getUserRole(){  
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'roles',
				'eq_table_col' => '1',
				'data' => '1', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	 

	public function addCompanyDetails(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			return $this->insertData__('company_details', $dataset);  

		}else{
			return $this->invalidSession(); 
		}
		 
	}
	
	public function addAdminUser(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dataset = $this->input->post();
			$dataset['password'] = md5($this->input->post('password'));
			 
			return $this->insertData__('users', $dataset);  

		}else{
			return $this->invalidSession(); 
		}
		 
	}
	
	public function editCompanyDetails(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('company_details', $dataset,'company_id="'.$this->input->post('company_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	} 
	
	public function editAdminUser(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('users', $dataset,'user_id="'.$this->input->post('user_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	} 
	 
	  
	public function deleteUser(){   
		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('users','user_id="'.$this->input->post('user_id').'"');  
		}else{
			return $this->invalidSession(); 
		}   
	}


	public function addSliderDetails(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			return $this->insertData__('home_slider', $dataset);  

		}else{
			return $this->invalidSession(); 
		}
		 
	}


	public function editSliderDetails(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('home_slider', $dataset,'id="'.$this->input->post('id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	} 


	public function fileUpload(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->fileUpload__($_POST, $_FILES);
		}else{
			return $this->invalidSession(); 
		} 
 
 	   
 
	} 

	public function removeFile(){    
		
		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$file_name = $this->input->post('file_name'); 
			return $this->deleteUploadedFile($file_name);  
		}else{
			return $this->invalidSession(); 
		} 
		
	}


	public function uploadSliderImage(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
			return $this->saveSliderImage__($_POST, $_FILES);
		}else{
			return $this->invalidSession(); 
		}  
 
	} 

	 
 
}
