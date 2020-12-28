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

	  

		$data = array( 
			'status' => 200, 
			'data' => $this->selectRawCustomData__($search_index)["data"], 
			'start' =>  $start, 
			'end' =>  $end,
			'total_results' => $total_results
		);
		
		return $this->returnJSON($data);  

	} 

 
}
