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

	public function onClientLogin(){    

		$search_index = array(  
			'table' => 'clients',
			'columns' => 'COUNT(*) as count, client_id, provider_id, status', 
			'data' => 'email= "'.$this->input->post('email').'"' 
		); 
		
		$getClient = $this->getTotalRows__($search_index)['data'][0]; 

		if ( $getClient->count == 0) {
			$dataset = $this->input->post(); 
			unset($dataset['auth_token']); 
			 
			$clientData = $this->insertRawData__('clients', $dataset);  

			$sessionData = $this->addUserSession($clientData['data']->insertedId, $this->input->post('auth_token'));  
			$sessionData['data']->client_id = $clientData['data']->insertedId; 

			return $this->returnJSON($sessionData);
	
		}else{

			$sessionData = $this->updateUserSession($getClient->client_id, $this->input->post('auth_token'));    
			$sessionData['data'] = $this->setSessionData($sessionData, $getClient,'Session updated');

			return $this->returnJSON($sessionData);
		}
		
 
	}

 
	public function checkUserLoginStatus(){

		$search_index = array(
			'columns' => 'us.*, c.client_id, c.provider_id, c.status' ,   
			'table' => 'user_sessions us, clients c',
			'eq_table_col' => '1',
			'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id= "'.$this->input->post('session_id').'"', 
		);

		$sessionData  = $this->selectRawCustomData__($search_index);

		if (count($sessionData['data']) > 0) {
		 	$inputData  = $sessionData['data'][0]; 
			$sessionData['data'] = $this->setSessionData($sessionData, $inputData,'Valid user');
		}
		
		return $this->returnJSON($sessionData); 
	}
	

	public function setSessionData($sessionData, $inputData, $message){ 

		return (object) array( 
			'client_id' => $inputData->client_id, 
			'provider_id' => ( (int)$inputData->status* (int)$inputData->client_id) ."".$inputData->provider_id."".$inputData->client_id,  
			'message' => $message 
		);

	}

	public function addUserSession($client_id, $auth_token){   

		$dataset = array(  
			'auth_token' => $auth_token,
			'client_id' => $client_id 
		); 

		return $this->insertRawData__('user_sessions', $dataset);  
	}


	public function updateUserSession($client_id, $auth_token){   

		$dataset = array(  
			'auth_token' => $auth_token,
			'client_id' => $client_id 
		);  

		return $this->updateRawData__('user_sessions', $dataset, 'client_id="'.$dataset['client_id'].'"');  
	}




	public function addClient(){  
		$dataset = $this->input->post();
		return $this->insertData__('clients', $dataset);  
	}
	

	public function getCustomerDetails(){  
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'customers',
			'eq_table_col' => '1',
			'data' => 'customer_id= "'.$this->input->post('customer_id').'"', 
		);

		return $this->selectCustomData__($search_index);
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
