<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	} 

  
	public function onClientLogin(){    

		$search_index = array(  
			'table' => 'clients',
			'columns' => 'COUNT(*) as count, first_name, profie_image, client_id, provider_id, status', 
			'data' => 'email= "'.$this->input->post('email').'"' 
		);
		
		$getClient = $this->getTotalRows__($search_index)['data'][0]; 

		if ( $getClient->count == 0) {
			$dataset = $this->input->post(); 
			unset($dataset['auth_token']); 
			 
			$clientData = $this->insertRawData__('clients', $dataset);  

			$sessionData = $this->addUserSession($clientData['data']->insertedId, $this->input->post('auth_token'));

			$search_index = array(
				'columns' => 'us.*, c.*' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id= "'. $clientData['data']->insertedId .'" ',
				 
			);

			$inputData = $this->selectRawCustomData__($search_index)['data'][0]; 

			if ($inputData->provider == "G" || $inputData->provider == "F" ) {
				 
				$dataset = array(  
					'profie_image' => $this->saveProfileImage__($inputData->client_id, $inputData->profie_image, $inputData->provider),
					'client_id' => $inputData->client_id
				); 

				$datasetCompany = array(   
					'client_id' => $inputData->client_id
				); 
				$this->insertData__('client_company', $datasetCompany);
				$this->updateData__('clients', $dataset, 'client_id="'.$dataset['client_id'].'"');
			}
		 
			$sessionData['data'] = $this->setSessionData($sessionData, $inputData,'Session inserted');  

			return $this->returnJSON($sessionData);
	
		}else{
 
			$sessionData = $this->updateUserSession($getClient->client_id, $this->input->post('auth_token'));    

			$search_index = array(
				'columns' => 'us.*, c.*' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id ', 
			);

			$inputData  = $this->selectRawCustomData__($search_index)['data'][0]; 

			$sessionData['data'] = $this->setSessionData($sessionData, $inputData ,'Session updated');

			return $this->returnJSON($sessionData);
		}
		
 
	}
	
	public function onAdminLogin(){

		$search_index = array(
			'columns' => '*' ,   
			'table' => 'users',
			'eq_table_col' => '1',
			'data' => 'user_email= "'.$this->input->post('user_email').'" AND password= "'.md5($this->input->post('password')).'"', 
		);

		return $this->selectCustomData__($search_index)  ;
	}
 
	public function checkUserLoginStatus(){
 
		$search_index = array(
			'columns' => 'us.*, c.*' ,   
			'table' => 'user_sessions us, clients c',
			'eq_table_col' => '1',
			'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id= "'.$this->input->post('session_id').'"', 
		);

		$sessionData  = $this->selectRawCustomData__($search_index);
		 
		if (count($sessionData['data']) > 0) {
		 	$inputData  = $sessionData['data'][0];  
			$sessionData['data'] = array_values($this->setSessionData($sessionData, $inputData,'Valid user'));
		}
		
		return $this->returnJSON($sessionData); 
	}
	

	public function setSessionData($sessionData, $inputData, $message){ 
		 
		$arrayVal = (object) array( 
			'client_id' => $inputData->client_id, 
			'first_name' => $inputData->first_name, 
			'email' => $inputData->email, 
			'auth_token' => $inputData->auth_token, 
			'profie_image' => $inputData->profie_image, 
			'provider_id' => ( (int)$inputData->status* (int)$inputData->client_id) ."".$inputData->provider_id."".$inputData->client_id,  
			'message' => $message 
		);

		return array($arrayVal);

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
 
 
}
