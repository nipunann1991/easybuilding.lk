<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');


defined('BASEPATH') OR exit('No direct script access allowed');

class SearchController extends CommonController {
	 
	function __construct() {
		parent::__construct();
		$this->load->model('CommonQueryModel');  
	}
 
     public function getSelectedProduct(){  
   
		$search_index = array(
			'columns' => 'c.cat_name ,c2.*, c1.cat_lvl1_name, c2.cat_lvl2_name' ,   
			'table' => '`categories-level2` c2, `categories-level1` c1, categories c',
			'eq_table_col' => '1 order by c1.cat_lvl1_name, c2.cat_lvl2_name ASC',
			'data' => 'c2.parent_cat_id=c1.cat_lvl1_id AND c1.parent_cat_id=c.cat_id AND c2.cat_lvl2_id="'.$this->input->post('cat_lvl2_id').'"', 
		);
	 
		return $this->selectCustomData__($search_index);  

	} 


	public function searchProducts(){  
 

		$limit = "LIMIT ".$this->input->post('limit') * ($this->input->post('page_index') - 1) ." , ".$this->input->post('limit') .""; 
   
		$search_index = array(
			'columns' => 'cc.*, c.provider_id',   
			'table' => '`client_company` cc, `services_list` sl, clients c',
			'eq_table_col' => '1 ORDER BY cc.client_id DESC '.$limit, 
			'data' => 'cc.company_id=sl.company_id AND c.client_id=cc.client_id AND cc.status=1 AND sl.cat_lvl2_id="'.$this->input->post('cat_lvl2_id').'"', 
		);

		$start = $this->input->post('limit') * ($this->input->post('page_index') - 1) + 1;
		$end = $this->input->post('limit') * ($this->input->post('page_index'));
	  	$total_results = $this->CommonQueryModel->count_filtered($search_index);

	  	if ($end > $total_results) {
	  		$end = $total_results - $start + 1;
	  	}

	  	if ($total_results == 0 ) {
	  		$start = 0;
	  	}

	  	$searchResults = $this->selectRawCustomData__($search_index)['data'];

	  	foreach ($searchResults as $key => $value) {
	  		  
	  		$serviceData = $this->getServics($value->company_id);

	  		$value->services = $serviceData['services'];
	  		$value->products = $serviceData['products']; 

	  	}
 		


		$data = array( 
			'status' => 200, 
			'data' => $searchResults, 
			'start' =>  $start, 
			'end' =>  $end,
			'total_results' => $total_results
		);
		
		return $this->returnJSON($data);  

	} 

	public function getServics($company_id){    

		 
		$search_index = array(
			'columns' => 'cl2.cat_lvl2_name, c.cat_id, c.cat_name' ,   
			'table' => 'services_list sl, `categories-level2` cl2, `categories-level1` cl1, categories c',
			'eq_table_col' => 'cl2.cat_lvl2_id = sl.cat_lvl2_id AND cl2.parent_cat_id = cl1.cat_lvl1_id AND cl1.parent_cat_id = c.cat_id ORDER BY c.cat_id ASC ',
			'data' => 'sl.company_id= "'.$company_id.'"', 
		);

		$dataset = $this->selectRawCustomData__($search_index);

		$services = array();
		$products = array();

		foreach ($dataset["data"] as $value) { 

			if ($value->cat_id == "C1015") {
				array_push($products, $value->cat_lvl2_name);
			}else if ($value->cat_id == "C1019") {
				array_push($services, $value->cat_lvl2_name);
			} 
			
		}

		$data = array(
			'services' => $services, 
			'products' => $products, 
		);
		
		return $data;
		
	}

 
}
