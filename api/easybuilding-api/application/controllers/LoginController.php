<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class LoginController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	} 

  
	public function onClientLogin(){    

		$email = $this->input->post('email');

		$search_index = array(  
			'table' => 'clients',
			'columns' => 'COUNT(*) as count, first_name, profie_image, client_id, provider_id, status', 
			'data' => 'email= "'. $email .'" ' 
		);
		 
		$getClient = $this->getTotalRows__($search_index)['data'][0]; 

		if ( $getClient->count == 0) {
			$dataset = $this->input->post(); 
			unset($dataset['auth_token']); 
			unset($dataset['password']); 
			unset($dataset['is_admin']); 
			$dataset['created_date'] = date("Y-m-d");

			 
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
					'client_id' => $inputData->client_id,
					'company_profile' => -1,
				); 

				$this->insertData__('client_company', $datasetCompany);
				$this->updateData__('clients', $dataset, 'client_id="'.$dataset['client_id'].'"');

			}else{
 

				$dataset = array(  
					'profie_image' => '',
					'client_id' => $inputData->client_id
				); 

				$datasetCompany = array(   
					'client_id' => $inputData->client_id,
					'company_profile' => -1,

				);  
				

				$this->insertData__('client_company', $datasetCompany);
				$this->updatePassword($inputData->client_id, $this->input->post('auth_token'), $this->input->post('password'));
				$this->updateData__('clients', $dataset, 'client_id="'.$dataset['client_id'].'"');
			}

		 	
			$sessionData['data'] = $this->setNewUserSessionData($sessionData, $inputData,'Session inserted');
 			//$this->sendRegistration($inputData);
			return $this->returnJSON($sessionData);
	
		}else{


			$sessionData = $this->updateUserSession($getClient->client_id, $this->input->post('auth_token'));    

			$search_index = array(
				'columns' => 'us.*, c.*, cc.profie_image as cpi, cc.company_id' ,      
				'table' => 'user_sessions us, clients c, client_company cc',
				'eq_table_col' => '1 ORDER BY cc.company_id DESC LIMIT 1',
				'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id=cc.client_id', 
			);


			$inputData = $this->selectRawCustomData__($search_index)['data'][0]; 

			$sessionData['data'] = $this->setSessionData($sessionData, $inputData ,'Session updated');

			return $this->returnJSON($sessionData);
		}
		
 
	}

	

	public function onClientLoginAdmin(){    
 

 		$dataset = $this->input->post(); 
		unset($dataset['auth_token']); 
		unset($dataset['password']); 
		unset($dataset['is_admin']); 
		$dataset['created_date'] = date("Y-m-d");

		 
		$clientData = $this->insertRawData__('clients', $dataset);  

		$sessionData = $this->addUserSession($clientData['data']->insertedId, $this->input->post('auth_token'));

		$search_index = array(
			'columns' => 'us.*, c.*' ,   
			'table' => 'user_sessions us, clients c',
			'eq_table_col' => '1',
			'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id= "'. $clientData['data']->insertedId .'" ',
			 
		);

		$inputData = $this->selectRawCustomData__($search_index)['data'][0];


		$datasetCompany = array(   
			'client_id' => $inputData->client_id,
			'company_profile' => -1,
		); 

		$this->insertData__('client_company', $datasetCompany); 

		$sessionData = $this->updateUserSession($inputData->client_id, $this->input->post('auth_token'));    

		$search_index = array(
			'columns' => 'us.*, c.*, cc.profie_image as cpi, cc.company_id' ,      
			'table' => 'user_sessions us, clients c, client_company cc',
			'eq_table_col' => '1 ORDER BY cc.company_id DESC LIMIT 1',
			'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id=cc.client_id', 
		);


		$inputData = $this->selectRawCustomData__($search_index)['data'][0]; 

		$sessionData['data'] = $this->setSessionData($sessionData, $inputData ,'Session updated');

		return $this->returnJSON($sessionData);
		 
		
 
	}

	public function onEBUserLogin(){ 

		$search_index = array(  
			'table' => 'clients c,  user_sessions us, client_company cc',
			'columns' => 'COUNT(*) as count, c.first_name, c.profie_image, cc.profie_image as cpi, cc.company_id, c.client_id, c.provider_id, c.status, us.password', 
			'data' => 'c.email= "'.$this->input->post('email').'" AND us.password= "'.$this->input->post('password').'" AND us.client_id=c.client_id AND c.client_id=cc.client_id' 
		);

		$getClient = $this->getTotalRows__($search_index)['data'][0];  
		$getClient->email = $this->input->post('email');
		$getClient->auth_token = $this->input->post('authToken');
 
		if ($getClient->count == 1) {
			
			$inputData = $getClient;
			$sessionData = $this->updateUserSession($getClient->client_id, $this->input->post('authToken'));    
			$sessionData['data'] = $this->setSessionData($sessionData, $inputData ,'Session updated'); 

			return $this->returnJSON($sessionData); 

		}else{

			$arrayVal = (object) array( 
				'status' =>  404,
				'message' => "Invalid email or password. Please try again with correct credentials."
			);

			return $this->returnJSON($arrayVal); 
		}

		
	}

	
	public function checkEmail(){

		$search_index = array(
			'columns' => 'client_id, email, first_name' ,   
			'table' => 'clients',
			'eq_table_col' => '1',
			'data' => 'email= "'.$this->input->post('email').'"', 
		);
 

		$data = $this->selectRawCustomData__($search_index);
		
		if (sizeof($data["data"]) == 1 && $this->input->post('email')) { 
			$digits = 4; 
			$rand_no = rand(pow(10, $digits-1), pow(10, $digits)-1);
			$data["data"][0]->verifycode = $rand_no;

			$dataset = array(
				'email' => $this->input->post('email'), 
				'request_reset' => $rand_no, 
			);

			$this->updateData__('clients', $dataset, 'email="'.$dataset['email'].'"');
			
			$this->sendResetPassword($data["data"][0]);
		}

		return $this->returnJSON($data);

	}



	public function validateEmailAddressOnSignUp(){

		$search_index = array(
			'columns' => 'client_id, email, first_name' ,   
			'table' => 'clients',
			'eq_table_col' => '1',
			'data' => 'email= "'.$this->input->post('email').'"', 
		);
 

		return $this->selectCustomData__($search_index); 

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
			'columns' => 'us.*, c.*, cc.profie_image as cpi, cc.company_id' ,   
			'table' => 'user_sessions us, clients c, client_company cc',
			'eq_table_col' => '1',
			'data' => 'us.auth_token= "'.$this->input->post('auth_token').'" AND c.client_id=us.client_id AND c.client_id=cc.client_id AND c.client_id= "'.$this->input->post('session_id').'"', 
		);

		$sessionData  = $this->selectRawCustomData__($search_index);
		 
		if (count($sessionData['data']) > 0) {
		 	$inputData  = $sessionData['data'][0];  
			$sessionData['data'] = array_values($this->setSessionData($sessionData, $inputData,'Valid user'));
		}


		
		return $this->returnJSON($sessionData); 
	}
	

	public function setNewUserSessionData($sessionData, $inputData, $message){ 
		 
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


	public function setSessionData($sessionData, $inputData, $message){ 
		 
		$arrayVal = (object) array( 
			'client_id' => $inputData->client_id, 
			'first_name' => $inputData->first_name, 
			'email' => $inputData->email, 
			'auth_token' => $inputData->auth_token, 
			'profie_image' => $inputData->profie_image, 
			'company_id' => $inputData->company_id,  
			'eb_profie_image' => $inputData->cpi, 
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

	public function updatePassword($client_id, $auth_token, $password){   

		$dataset = array(  
			'auth_token' => $auth_token,
			'client_id' => $client_id,
			'password' => $password  
		);  

		return $this->updateRawData__('user_sessions', $dataset, 'client_id="'.$dataset['client_id'].'" AND auth_token="'.$dataset['auth_token'].'"');  
	}



	public function resetPassword(){   

		$search_index = array(
			'columns' => '*' ,   
			'table' => 'clients',
			'eq_table_col' => '1',
			'data' => 'email= "'.$this->input->post('email').'" AND client_id= "'.$this->input->post('client_id').'" AND request_reset= "'.$this->input->post('request_reset').'"', 
		);

		$data = $this->selectRawCustomData__($search_index);
 
		 
		if (sizeof($data["data"]) == 1 ) { 

		  	$dataset = array(   
				'client_id' => $this->input->post('client_id'),
				'password' => $this->input->post('password') 
			); 


			$dataset1 = array(   
				'client_id' => $this->input->post('client_id'),
				'request_reset' => 0 
			);  
	  
			$this->updateData__('clients', $dataset1, 'client_id="'.$dataset1['client_id'].'"');
			return $this->updateData__('user_sessions', $dataset, 'client_id="'.$dataset['client_id'].'"');
		}else{
			 
			return $this->returnJSON($data); ;
		}

		  
	}
 	 

 	public function sendResetPassword($inputData){   
 
		(ENVIRONMENT !== 'production')? $passwordResetURL = constant("LOCAL_URL") : $passwordResetURL = constant("LIVE_URL") ;  

 		$data = array(
			'verifycode' => $inputData->verifycode,  
			'profileURL' => $passwordResetURL ,
			'email' => $inputData->email,
			'name' => $inputData->first_name,
			'client_id' => $inputData->client_id
		);
 

 		$mail = $this->smtpConfig();
 		$msg = $this->load->view('mail-templates/reset-password', $data, TRUE);

 		$mail->setFrom('no-reply@easybuilding.biz', 'Easybuilding.lk - Password Reset'); 
 		
 		// Add a recipient
 		$mail->addAddress($inputData->email , $inputData->first_name); 

 		// Email subject
        $mail->Subject = "Password Reset - Easybuilding.lk";

        // Set email format to HTML
        $mail->isHTML(true);

        // Email body content
        $mailContent = $msg; 

        $mail->Body = $mailContent;

        $mail->send(); 

       
 	} 
 
}
