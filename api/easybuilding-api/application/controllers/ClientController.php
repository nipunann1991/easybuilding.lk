<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class ClientController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	} 

	public function getNextTableID(){   
		return $this->getNextID('customers');  
	} 


	public function addClient(){  
		$dataset = $this->input->post();
		return $this->insertData__('clients', $dataset);  
	}
	

	public function getClientDetailsDT(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('c.client_id', 'c.first_name', 'c.last_name', 'c.email', 'c.provider'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; 
			$orderedCol = $dt['get_column_name'];	

			$profile_type = $this->input->get('profile_type');
			$profile_type_val= "";

			if ($profile_type != -1 && $profile_type != 2 ) {
				$profile_type_val= "AND cc.company_profile='".$this->input->get('profile_type')."'";
			}
 
			if ($profile_type == 2 ) {
				$profile_type_val= "AND c.first_name='Admin'";
			}
 

			$searchData = array(
				'columns' => 'c.*, cc.display_name, cc.featured, cc.status AS company_status' ,   
				'table' => 'clients c, client_company cc',
				'data' => "cc.client_id=c.client_id ".$profile_type_val." AND (".$search_by_feilds.')  order by c.'. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			);  
		
			$get_data = array(
				'columns' => 'c.*, cc.display_name, cc.featured, cc.status AS company_status' ,   
				'table' => 'clients c, client_company cc',
				'data' => "cc.client_id=c.client_id ".$profile_type_val." AND (".$search_by_feilds.')  order by c.'. $orderedCol .' '.$selectedOrd.' ',
			);  
			  
			$data = json_decode($this->selectCustomData__($searchData)->final_output, true);
 
	 		  
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


	public function getClientProfileDetailsDT(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('cc.display_name', 'c.client_id', 'cc.email', 'cc.tel1'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; 
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'c.client_id, c.first_name, c.last_name, c.provider_id, cc.*' ,   
				'table' => 'clients c, client_company cc',
				'data' => "cc.client_id=c.client_id AND (".$search_by_feilds.')  order by cc.'. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			);  
		
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'client_company',
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

		  

	public function getSingleCustomer(){  
 
		$dt = $this->dataTableInitialValues(); 
		$search_columns = array('customer_name', 'customer_name', 'customer_address', 'customer_nic', 'customer_email', 'customer_tel1'); 

     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
		$selectedOrd = 'desc'; //$dt['get_order'];
		$orderedCol = $dt['get_column_name'];		

		$search1 = array(
			'columns' => '*' ,   
			'table' => 'customers',
			'data' => $search_by_feilds.' order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
			'eq_table_col' => ''
		); 

	 
	
		$get_data = array(
			'columns' => '*' ,   
			'table' => 'customers',
			'data' => '1',
		); 

		  
		$data = json_decode($this->selectCustomData__($search1)->final_output, true);

		//print_r($search);
 		  
		$result = (object) array(
			'draw' => intval($this->input->get('draw')),
			'recordsTotal' => $this->CommonQueryModel->count_filtered($get_data),
			'recordsFiltered' => $this->CommonQueryModel->count_filtered($get_data),
			"data" => $data['data'] 

		);  
   		
   		return $this->returnJSON($result);
	}


	public function updateCustomerDetails(){  
		$dataset = $this->input->post(); 
		return $this->updateData__('customers', $dataset,'customer_id="'.$this->input->post('customer_id').'"');  
	}

	public function deleteCustomer(){   
		return $this->deleteData__('customers','customer_id="'.$this->input->post('customer_id').'"');  
	}


	public function getProfileToken(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.*, us.auth_token' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'c.client_id= "'.$this->input->post('client_id').'" AND c.provider_id= "'.$this->input->post('provider_id').'" AND c.client_id = us.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

 
}
