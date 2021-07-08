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

		$sort_by = $this->getSortByFilter($this->input->post('sort_by')); 

		$sort_by_service_area = $this->getSortByFilterServiceArea($this->input->post('sort_by_service_area'), $this->input->post('area'));

		$search = 'sl.cat_lvl2_id="'.$this->input->post('cat_lvl2_id').'"';
		$distinct = "";

		if($this->input->post('searchString') != ''){
			$distinct = "DISTINCT";
			$search = '(cc.display_name LIKE "%'.$this->input->post('searchString').'%" OR CONVERT( cl2.cat_lvl2_name USING latin1) LIKE "%'.$this->input->post('searchString').'%" )';
		}
		 
 
	  	 if($this->input->post('sort_by_service_area') < 3){

	  	 	$search_index = array(
				'columns' => $distinct.' cc.*, c.provider_id',   
				'table' => '`client_company` cc, `services_list` sl, clients c, `categories-level2` cl2 ',
				'eq_table_col' => '1 ORDER BY '.$sort_by.' '.$limit, 
				'data' => 'cc.company_id=sl.company_id AND cl2.cat_lvl2_id=sl.cat_lvl2_id  AND c.client_id=cc.client_id AND cc.status=1 AND '. $search.' AND '.$sort_by_service_area 
			);

	  	 }else{

	  	 	if($this->input->post('sort_by_service_area') == 4){

	  	 		$search_index = array(
					'columns' =>  $distinct.' d.district_id' ,   
					'table' => 'cites c, districts d',
					'eq_table_col' => '1 order by c.city ASC',
					'data' => 'c.district_id=d.district_id AND c.city_id="'.$this->input->post('area').'"', 
				); 

				$area = $this->selectRawCustomData__($search_index)["data"][0]->district_id;


				$search_index = array(
					'columns1' => $distinct.' cc.*, c.provider_id, sd.district_id',   
					'table1' => '`clients` c, `services_list` sl, `categories-level2` cl2, `client_company` cc LEFT JOIN  '.$sort_by_service_area['table']." ON sd.company_id=cc.company_id AND sd.district_id='".$area."'",

					'eq_table_col1' => '1 ORDER BY '.$sort_by.' '.$limit, 
					'data1' => 'cc.company_id=sl.company_id AND cl2.cat_lvl2_id=sl.cat_lvl2_id AND c.client_id=cc.client_id AND cc.status=1 AND '. $search.' AND ( sd.district_id='. $area .' OR cc.all_island = 1 )',
					'columns2' => $distinct.' cc.*, c.provider_id, ct.district_id',   
					'table2' => '`clients` c, `cites` ct, `services_list` sl, `categories-level2` cl2, `client_company` cc LEFT JOIN service_areas sa ON sa.company_id=cc.company_id',
					'eq_table_col2' => '1 ORDER BY '.$sort_by.' '.$limit, 
					'data2' => 'cc.company_id=sl.company_id AND sa.city_id=ct.city_id AND cl2.cat_lvl2_id=sl.cat_lvl2_id AND c.client_id=cc.client_id AND cc.status=1 AND '. $search.' AND  ( ct.district_id='. $area .' OR cc.all_island =1 )',
				);
 


	  	 	}else{


				$search_index = array(
					'columns1' => $distinct.' cc.*, c.provider_id, sd.district_id',   
					'table1' => '`clients` c, `services_list` sl, `categories-level2` cl2, `client_company` cc LEFT JOIN  '.$sort_by_service_area['table']." ON ".$sort_by_service_area['where'],
					'eq_table_col1' => '1 ORDER BY '.$sort_by.' '.$limit, 
					'data1' => 'cc.company_id=sl.company_id AND cl2.cat_lvl2_id=sl.cat_lvl2_id AND c.client_id=cc.client_id AND cc.status=1 AND '. $search.' AND ( sd.district_id='.$this->input->post('area').' OR cc.all_island = 1 )',
					'columns2' => $distinct.' cc.*, c.provider_id, ct.district_id',   
					'table2' => '`clients` c, `cites` ct, `services_list` sl, `categories-level2` cl2, `client_company` cc LEFT JOIN  service_areas sa ON sa.company_id=cc.company_id',
					'eq_table_col2' => '1 ORDER BY '.$sort_by.' '.$limit, 
					'data2' => 'cc.company_id=sl.company_id AND sa.city_id=ct.city_id AND cl2.cat_lvl2_id=sl.cat_lvl2_id AND c.client_id=cc.client_id AND cc.status=1 AND '. $search.' AND ( ct.district_id='.$this->input->post('area').' OR cc.all_island = 1 )',
				);

	  	 	} 
	  	 	 
	  	 }
		 


		$start = $this->input->post('limit') * ($this->input->post('page_index') - 1) + 1;
		$end = $this->input->post('limit') * ($this->input->post('page_index')); 


		if($this->input->post('sort_by_service_area') == 3 || $this->input->post('sort_by_service_area') == 4){  
	  		$total_results = $this->CommonQueryModel->count_filtered_union($search_index);
		}else{
			$total_results = $this->CommonQueryModel->count_filtered($search_index);
		}

		

	  	if ($end > $total_results) {
	  		$end = $total_results;
	  	}

	  	if ($total_results == 0 ) {
	  		$start = 0;
	  	}


	  	if($this->input->post('sort_by_service_area') == 3 || $this->input->post('sort_by_service_area') == 4){ 
	  		$searchResults = $this->selectCustomDataUnion__($search_index)['data'];
		}else{
			$searchResults = $this->selectRawCustomData__($search_index)['data'];
		}
	  	

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



	public function searchImages(){  
 

		$searchString = $this->input->post('searchString');

		$searchWord = ["at", "in"];
		$searchArray = [];

		

		foreach ($searchWord as $sw) {
			$breakWord = " ". $sw ." "; 

		  	if(strpos($searchString, $sw) !== false){
			    $searchArray = explode($breakWord, $searchString);
			    break;
			}   
		}

		if (empty($searchArray)) {
			 array_push($searchArray, $searchString); 
		}
	 
		$limit = "LIMIT ".$this->input->post('limit') * ($this->input->post('page_index') - 1) ." , ".$this->input->post('limit') ."";   

		$sort_by = ""; 
		$search_index = "";
		 

		if($this->input->post('cat_lvl2_id') == 'search'){

			$search_index = array(
				'columns' => 'DISTINCT pi.*, p.project_name, cc.display_name, cc.client_id, cc.company_id, c.provider_id, icl.*, cl2.cat_lvl2_name',   
				'table' => '`project_images` pi, `project` p, client_company cc, clients c, image_category_list icl, `categories-level2` cl2',
				'eq_table_col' => '1 '.$limit, 
				'data' => 'pi.project_id=p.project_id AND p.company_id=cc.company_id AND icl.img_id=pi.img_id AND c.client_id=cc.client_id AND cl2.cat_lvl2_id=icl.cat_lvl2_id AND cc.status=1 AND ( p.project_name LIKE "%'.$searchArray[0].'%" OR cl2.cat_lvl2_name LIKE "%'.$searchArray[0].'%")' 
			);
		}else{

			$search_index = array(
				'columns' => 'pi.*, p.project_name, cc.display_name, cc.client_id, cc.company_id, c.provider_id',   
				'table' => '`project_images` pi, `project` p, client_company cc, clients c, image_category_list icl',
				'eq_table_col' => '1 '.$limit, 
				'data' => 'pi.project_id=p.project_id AND p.company_id=cc.company_id AND icl.img_id=pi.img_id AND c.client_id=cc.client_id AND cc.status=1 AND icl.cat_lvl2_id="'.$this->input->post('cat_lvl2_id').'"  ' 
			);

		}
 	
  	   	
		 

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
 

		$data = array( 
			'status' => 200, 
			'data' => $searchResults, 
			'start' =>  $start, 
			'end' =>  $end,
			'total_results' => $total_results
		);
		
		return $this->returnJSON($data);  

		 
		 
	} 


	public function plural( $amount, $singular = '', $plural = 's' ) {
	    if ( $amount === 1 ) {
	        return $singular;
	    }
	    return $plural;
	}
	


	public function getSortByFilter($id){   

		$query = "";

		switch ($id) {
			case '1':
				$query = "cc.rating DESC"; 
				break;
			
			case '2':
				$query = "c.created_date DESC";
				break;

			case '3':
				$query = "cc.total_reviews DESC";
				break;

				
		}

		return $query;
	}


	public function getSortByFilterServiceArea($id, $area = -1){   

		$query = "1";

		switch ($id) {
			case '2':
				$query = "cc.all_island = 1"; 
				break;  

			case '3':
				$query = array(
					'table' => 'service_districts sd', 
					'where' => 'sd.company_id=cc.company_id AND sd.district_id='.$area.''
				);

				break;

			case '4':
				$query = array(
					'table' => 'service_districts sd', 
					'where' => 'sd.company_id=cc.company_id AND sd.district_id='.$area.''
				);

				break;
		}

		return $query;
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
