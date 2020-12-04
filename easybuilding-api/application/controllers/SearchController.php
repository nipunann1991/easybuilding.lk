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

 
}
