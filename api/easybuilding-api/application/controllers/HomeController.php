<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class HomeController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
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
	 
 
}
