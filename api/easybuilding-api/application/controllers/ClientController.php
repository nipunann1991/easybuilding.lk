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
			$search_columns = array('client_id', 'first_name', 'last_name', 'email', 'provider'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; 
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => '*' ,   
				'table' => 'clients',
				'data' => $search_by_feilds.' order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			);  
		
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'clients',
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

 
}