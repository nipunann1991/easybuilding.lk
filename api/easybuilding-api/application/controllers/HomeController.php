<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class HomeController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	  
	public function getCompanyData(){  
   
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'company_details',
			'eq_table_col' => '1',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
		
	}


	public function getCustomProfileDetails(){  
 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => 'c.*' ,   
				'table' => 'user_sessions us, clients c',
				'eq_table_col' => '1',
				'data' => 'c.provider_id= "'.$this->input->get('provider_id').'" AND c.client_id= "'.$this->input->get('client_id').'" AND c.client_id = us.client_id', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	} 


	public function getConstructors(){  
  
		
			$search_index = array(
				'columns' => 'cc.*, c.provider_id ' ,   
				'table' => 'client_company cc, clients c',
				'eq_table_col' => 'cc.company_profile = 1 AND cc.status = 1 AND cc.featured = 1 Limit 8',
				'data' => 'c.client_id = cc.client_id', 
			);

			return $this->selectCustomData__($search_index);

		
		
	} 


	public function getProductsMenuItems(){  
   
			$search_index = array(
				'columns' => 'c2.*, c1.cat_lvl1_name' ,   
				'table' => '`categories-level2` c2, `categories-level1` c1, categories c',
				'eq_table_col' => '1 order by c1.cat_lvl1_name, c2.cat_lvl2_name ASC',
				'data' => 'c2.parent_cat_id=c1.cat_lvl1_id AND c1.parent_cat_id=c.cat_id AND c.cat_id="C1015"', 
			);
		 
			return $this->selectCustomData__($search_index);
 
		
	} 


	public function getServicesMenuItems(){  
   
			$search_index = array(
				'columns' => 'c2.*, c1.cat_lvl1_name' ,   
				'table' => '`categories-level2` c2, `categories-level1` c1, categories c',
				'eq_table_col' => '1 order by c1.cat_lvl1_name, c2.cat_lvl2_name ASC',
				'data' => 'c2.parent_cat_id=c1.cat_lvl1_id AND c1.parent_cat_id=c.cat_id AND c.cat_id="C1019"', 
			);
		 
			return $this->selectCustomData__($search_index);
 
		
	} 


	public function getPhotosMenuItems(){  
   
			$search_index = array(
				'columns' => 'c2.*, c1.cat_lvl1_name' ,   
				'table' => '`categories-level2` c2, `categories-level1` c1, categories c',
				'eq_table_col' => '1 order by c1.cat_lvl1_name, c2.cat_lvl2_name ASC',
				'data' => 'c2.parent_cat_id=c1.cat_lvl1_id AND c1.parent_cat_id=c.cat_id AND c.cat_id="C1022"', 
			);
		 
			return $this->selectCustomData__($search_index);
 
		
	} 


	public function getAdSlides(){  
   
		$search_index = array(
			'columns' => '*' ,   
			'table' => 'home_slider',
			'eq_table_col' => '1',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index); 
		
	}
	 

	 
 
}
