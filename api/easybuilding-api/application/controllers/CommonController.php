<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, content-type, X-Token, x-token');


defined('BASEPATH') OR exit('No direct script access allowed');

class CommonController extends CI_Controller {
	
	 

	function __construct() {
		parent::__construct();
		$this->load->model('CommonQueryModel');  
	}


	public function getAllData__($table_name){

        $results = $this->CommonQueryModel->selectAllData($table_name);
        return $this->returnJSON($results);

    }

    public function getAllDatatoDT__($table_name){

        return $this->CommonQueryModel->selectAllData($table_name); 

    }


    public function generateID($prefix, $value){

        return $prefix."". ( 1000 + (int) $value ); 

    }

   

    public function setSess($newdata){
    	$this->session->set_userdata($newdata);
    }

    public function filterLogTokenData(){
    	$dataset = $this->input->post();
			unset($dataset['token'], $dataset['teacher_id']);

		return $dataset;
    }


   	public function checkSelectedData__($data, $selected_data, $field_name){

 		//print_r($selected_data['data']);

 		$j = 0;


   		for ($i=0; $i < sizeof($data['data']); $i++) {

   			if (sizeof($selected_data['data']) > 0 && $j < sizeof($selected_data['data']) ) {


   				if ($selected_data['data'][$j]->{$field_name} == $data['data'][$i]->{$field_name} ) {
	   				$data['data'][$i]->checked = true;

	   				$j++;
	   			} else{
	   				$data['data'][$i]->checked = false;
	   			}

   			}else{
   				$data['data'][$i]->checked = false;
   			}


		}

		return $data['data'];

    }


    public function filterDatatoArray__($data){

    	$data_arr = [];

    	for ($i=0; $i < sizeof($data['data']); $i++) {
    		array_push($data_arr, $data['data'][$i]->id);
    	}

    	return $data_arr;

    }

    public function checkUserToken(){
		return array( 'user_id' => $this->input->post('log_id'), 'token' => $this->input->post('token'));
    }

    public function setTokenError(){
    	$output = array(
			'status' => 401 ,
			'data' => 'Invalid token',
		);

		return $this->returnJSON($output);
    }


  	public function getUserToken($data){

    	$search = array(
			'table' => 'user_tokens',
			'columns' => '*',
			'data' => " user_id = '".$data['user_id']."' AND token  = '".$data['token']."'",
		);

		return $this->CommonQueryModel->count_filtered($search);

    }


    public function getTotalCount__($data){
 
		return $this->CommonQueryModel->getTotalCount($data);

    }


    public function getSumOfColumn__($data){
 
		return $this->CommonQueryModel->getSumOfColumn($data);

    }

    

	
	public function isUserSessionValid(){
 		
 		$search_index = array(
			'columns' => '*' ,   
			'table' => 'user_sessions',
			'eq_table_col' => '1',
			'data' => 'auth_token= "'. $this->input->get('auth_token') .'" AND client_id= "'. $this->input->get('session_id') .'"', 
		);

		$result = $this->selectRawCustomData__($search_index);

		if (sizeof($result["data"]) == 0) {
			
			 $search_index = array(
				'columns' => '*' ,   
				'table' => 'users',
				'eq_table_col' => '1',
				'data' => 'auth_token= "'. $this->input->get('auth_token') .'" AND user_id= "'. $this->input->get('session_id') .'"', 
			);

			$result = $this->selectRawCustomData__($search_index);

			return $result;

		}else{
			return $result;
		}	

		 

    }


    public function invalidSessionDT(){
 		
 		$data['data'] = -1; 

		$result = (object) array(
			'draw' => 0,
			'recordsTotal' => 0,
			'recordsFiltered' => 0,
			"data" => [],
			"message" => $this->sendResponse($data)

		);  
   		
   		return $this->returnJSON($result);

    }

		 
	public function invalidSession(){
 		
 		$data['data'] = -1; 
		return $this->returnJSON($this->sendResponse($data)); 

    }


	public function getTotalRows__($dataset){ 
		$data["results"] = $this->CommonQueryModel->getTotalRows($dataset);  
		return $data["results"];
    }


	public function insertData__($table, $dataset){

    	$insert_vals = $this->getFilterdData($table, $dataset);
		$results = $this->CommonQueryModel->insertData($insert_vals);
		return $this->returnJSON($results);

    }


    public function insertRawData__($table, $dataset){

    	$insert_vals = $this->getFilterdData($table, $dataset);
		return $this->CommonQueryModel->insertData($insert_vals);
    }


    public function updateData__($table, $dataset, $where){

    	$update_val = array(
			'table' => $table,
			'values' => $this->setDataUpdateQuery($dataset),
			'data' => $where,
		);

		$data["results"] = $this->CommonQueryModel->updateData($update_val);
		return $this->output->set_output(json_encode($data["results"], JSON_PRETTY_PRINT));
    }


     public function updateRawData__($table, $dataset, $where){

    	$update_val = array(
			'table' => $table,
			'values' => $this->setDataUpdateQuery($dataset),
			'data' => $where,
		);

		return $this->CommonQueryModel->updateData($update_val); 
    }


     public function selectCustomData__($search_index){ 

        $data["results"] = $this->CommonQueryModel->selectCustomData($search_index);
        return $this->returnJSON($data["results"]);

    }


    public function selectRawCustomData__($search_index){ 

        return $this->CommonQueryModel->selectCustomData($search_index);
        //return $this->returnJSON($data["results"]);

    }


    public function deleteData__($table, $where){

    	$delete_val = array(
			'table' => $table ,
			'data' => $where,
		);

		$data["results"] = $this->CommonQueryModel->deleteData($delete_val);
		return $this->returnJSON($data["results"]);
    }

	


    private function getFilterdData($table, $dataset){

		$columns = array(); $values = array();


		$get_columns = array_keys($dataset);
		$get_values = array_values($dataset);


		foreach ($get_columns as $value) {
			array_push($columns, "`".addslashes($value)."`");
		}

		foreach ($get_values as $value) {
			array_push($values, "'".addslashes($value)."'");
		}


		$insert_vals = array(
			'table' => $table,
			'columns' => implode(", ",$columns),
			'values' => implode(", ",$values) ,
		);

		return $insert_vals;
	}


	public function returnJSON($data){
		return $this->output->set_output(json_encode($data, JSON_PRETTY_PRINT));
	}

	

	public function sendResponse($data){
 

		if($data['data'] == -1) {
      		$output = array(
				'status' => 401 ,
				'data' => 'Unauthorized client. The auth token is invalid',
			);

      	}else{

      		if (sizeof($data['data']) > 0) {

		        $output = array(
					'status' => 200 ,
					'data' => $data,

				);

	      	}else if(sizeof($data['data']) == 0){
	      		$output = array(
					'status' => 404 ,
					'data' => 'No data found',
				);

	      	}else {
	      		$output = array(
					'status' => 401 ,
					'data' => 'Data Error',
				);
	      	}

      	}

		

      	return $output;
	}


	private function setDataUpdateQuery($dataset){
		$values = '';
		$insert_vals =  array();

		$get_columns = array_keys($dataset);
		$get_values = array_values($dataset);

		for ($i=0; $i < sizeof($get_columns) ; $i++) {

			if ($i == 0) {
				$values = "`".$get_columns[$i]."`='".addslashes($get_values[$i])."'";
			}else{
				$values = $values.",`".$get_columns[$i]."`='".addslashes($get_values[$i])."'";
			}
		}

		return $values;

	}

	public function dataTableInitialValues(){

		$get_column = $this->input->get('order[0][column]');

		return	array(
			'get_column_name' => $this->input->get('columns['.$get_column.'][data]'),
			'get_order' => $this->input->get('order[0][dir]'),
			'search_val' => $this->input->get('search[value]'),
			'start'  => (int)  $this->input->get('start'),
	    	'length'  => (int) $this->input->get('length')
		);


	}

	public function getNextID($table_name){
		$data["results"] = $this->CommonQueryModel->getAutoIncrementID($table_name);
        return $this->returnJSON($data["results"]);
	}


	public function searchFromColsDT($columns, $search_val){

	  	$values = '';

		for ($i=0; $i < sizeof($columns) ; $i++) {

			$values = $values.''.$columns[$i].' LIKE "%'.$search_val.'%"';

			if ($i != (sizeof($columns) - 1)) {
			 	$values = $values." OR ";
			}
		}

		return $values;

	}


	public function fileUpload__($client_id, $postVal, $fileVal){ 

		$url=$this->config->base_url(); 
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/';

		if (!file_exists($upload_dir)) {
		    mkdir($upload_dir, 0777, true);
		    mkdir($upload_dir.'/thumb', 0777, true);
		    mkdir($upload_dir.'/xs-thumb', 0777, true); 
		} 
 
     	$generatedFileName = basename(time().''.$_FILES["file"]["name"]);

	    $target_file = $upload_dir . $generatedFileName;   

	    $move_file = move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

	    $this->make_thumb($target_file, $upload_dir.'/thumb/'. $generatedFileName, 340); 
	    $this->make_thumb($target_file, $upload_dir.'/xs-thumb/'. $generatedFileName, 100);

	    $output = array(
			'status' => 200 , 
			'data' => (object) array(
				'new_file'=> $generatedFileName, 
				'target_file' => $url.'assets/uploads/'.$client_id.'/'.$generatedFileName, 
				'moved_path' => $move_file, 'temp_folder' => $_FILES["file"]["tmp_name"]
			)  
		);
 
 	    return $this->output->set_output(json_encode($output, JSON_PRETTY_PRINT));
 
	}


	public function uploadProjectImages__($client_id, $postVal, $fileVal, $isRaw, $folder_name){ 

		$url=$this->config->base_url();  
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/'.$postVal['company_id'].'/'.$folder_name.'/';

 
		if (!file_exists($upload_dir)) {
		    mkdir($upload_dir, 0777, true); 
		    mkdir($upload_dir.'/thumb', 0777, true);
		} 

		$file_name = preg_replace("/\s+\(|\)/", "_", $_FILES["file"]["name"]);  
		 
     	$generatedFileName = basename(time().''.$file_name);

	    $target_file = $upload_dir . $generatedFileName;   

	    $move_file = move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

	    $this->make_thumb($target_file, $upload_dir.'/thumb/'. $generatedFileName, 400);  

	    $output = array(
			'status' => 200 , 
			'data' => (object) array(
				'new_file'=> $generatedFileName, 
				'target_file' => $url.'assets/uploads/'.$client_id.'/'.$postVal['company_id'].'/'.$folder_name.'/'.$generatedFileName, 
				'moved_path' => $move_file, 'temp_folder' => $_FILES["file"]["tmp_name"]
			)  
		);
 
 	    
 	    if (!$isRaw) {
 	    	return $this->output->set_output(json_encode($output, JSON_PRETTY_PRINT));
 	    }else{
 	    	return json_encode($output, JSON_PRETTY_PRINT);
 	    }


	}


	public function saveCoverImage__($client_id, $postVal, $fileVal){ 


		$url=$this->config->base_url(); 
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/'.$postVal['company_id'].'/';

		if (!file_exists($upload_dir)) {
		    mkdir($upload_dir, 0777, true);
		} 

     	$generatedFileName = basename(time().''.$_FILES["file"]["name"]).'.jpg';

	    $target_file = $upload_dir . $generatedFileName;   

	    $move_file = move_uploaded_file($_FILES["file"]["tmp_name"], $target_file); 

	    $output = array(
			'status' => 200 , 
			'data' => (object) array(
				'new_file'=> $generatedFileName, 
				'target_file' => $url.'assets/uploads/'.$client_id.'/'.$postVal['company_id'].'/'.$generatedFileName, 
				'moved_path' => $move_file, 'temp_folder' => $_FILES["file"]["tmp_name"]
			)  
		);
 
 	    return $this->output->set_output(json_encode($output, JSON_PRETTY_PRINT));


	}

	
	public function saveProfileImage__($client_id, $remoteUrl, $provider){ 
		  
		switch ($provider) {
			case 'F': 
				$url = explode('?', $remoteUrl);
				$remoteUrl = $url[0]."?type=large"; 
				break;

			case 'G':
				$url = explode('=', $remoteUrl);
				$remoteUrl = $url[0]."=s200-c"; 
				break;
			
			default: 
				break;
		}
		  
		   
		$img = time().''.'prof.png';  
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/';
		
		if (!file_exists($upload_dir)) {
		    mkdir($upload_dir, 0777, true);
		    // mkdir($upload_dir.'/thumb', 0777, true);
		    // mkdir($upload_dir.'/xs-thumb', 0777, true); 
		} 
		   
		file_put_contents($upload_dir.''.$img, file_get_contents($remoteUrl)); 
		  
		return $img;
	}


	 


	public function make_thumb($src, $dest, $desired_width) {

		/* read the source image */

		$extension = pathinfo($src, PATHINFO_EXTENSION);

		if ($extension == 'jpg' || $extension == 'jpeg') { 
		   $source_image = imagecreatefromjpeg($src);

		}else if ($extension == 'png') {
			$source_image = imagecreatefrompng($src);
		}
		
		$width = imagesx($source_image);
		$height = imagesy($source_image);
		
		/* find the "desired height" of this thumbnail, relative to the desired width  */
		$desired_height = floor($height * ($desired_width / $width));
		
		/* create a new, "virtual" image */
		$virtual_image = imagecreatetruecolor($desired_width, $desired_height);
		
		/* copy source image at a resized size */
		imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, $desired_width, $desired_height, $width, $height);
		
		/* create the physical thumbnail image to its destination */
		imagejpeg($virtual_image, $dest);
	}
 

	public function deleteUploadedFile($client_id, $company_id, $file){ 
		
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/'.$company_id.'/';
		
		unlink($upload_dir.''.$file);
		// unlink($upload_dir.'thumb/'.$file);
		// unlink($upload_dir.'xs-thumb/'.$file); 

		return 'file removed';

	}


	public function deleteProjectImages($client_id, $company_id, $file){ 
		
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/'.$company_id.'/projects/';
		
		unlink($upload_dir.''.$file); 
		unlink($upload_dir.'thumb/'.$file); 

		return 'file removed';

	}



	public function deleteProductImages($client_id, $company_id, $file){ 
		
		$upload_dir = $_SERVER['DOCUMENT_ROOT'].'/easybuilding-api/assets/uploads/'.$client_id.'/'.$company_id.'/products/';
		
		unlink($upload_dir.''.$file); 
		unlink($upload_dir.'thumb/'.$file); 

		return 'file removed';

	}




}
