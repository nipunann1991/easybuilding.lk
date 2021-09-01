<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class CityController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	 
	
 	public function getCitiesDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('city_id', 'district_name', 'city'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'c.*, d.*' ,   
				'table' => 'cites c, districts d',
				'data' => 'c.district_id=d.district_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => 'c.*, d.*' ,   
				'table' => 'cites c, districts d',
				'data' => 'c.district_id=d.district_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.'  ',
				'eq_table_col' => ''
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
			
			return $this->invalidSessionDT(); 
			
		}
	}


	public function getSelectedCity(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$search_index = array(
				'columns' => '*' ,   
				'table' => 'cites',
				'eq_table_col' => '1',
				'data' => 'city_id= "'.$this->input->post('city_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function getDistricts(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'districts',
				'eq_table_col' => '1',
				'data' => '1', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function addCity(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			return $this->insertData__('cites', $dataset);  

		}else{
			return $this->invalidSession(); 
		}
		 
	}
	

	public function editCity(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('cites', $dataset,'city_id="'.$this->input->post('city_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	} 

	public function deleteCity(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('cites','city_id="'.$this->input->post('city_id').'"');  
		}else{
			return $this->invalidSession(); 
		} 
	  
		
	}

	 
	 
 
}
