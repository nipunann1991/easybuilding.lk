<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class CategoriesController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	} 

	public function getNextTableID(){   
		return $this->getNextID('customers');  
	}
 
  

	public function getSelectedMainCategory(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'categories',
				'eq_table_col' => '1',
				'data' => 'cat_id= "'.$this->input->post('cat_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	public function getSelectedLvl1Category(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => '`categories-level1`',
				'eq_table_col' => '1',
				'data' => 'cat_lvl1_id= "'.$this->input->post('cat_lvl1_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}
	

	public function getSelectedLvl2Category(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$search_index = array(
				'columns' => '*' ,   
				'table' => '`categories-level2`',
				'eq_table_col' => '1',
				'data' => 'cat_lvl2_id= "'.$this->input->post('cat_lvl2_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}

	public function getMainCategories(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'categories',
				'eq_table_col' => '1',
				'data' => '1', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}
	

	public function getParentLvl1Categories(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => '`categories-level1`',
				'eq_table_col' => '1',
				'data' => '1', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}
	
	
	public function addMainCategory(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			$data = $this->insertRawData__('categories', $dataset); 

			$dataId = array(
				'id' => $data['data']->insertedId, 
				'cat_id' => $this->generateID('C', $data['data']->insertedId)
			);

			return $this->updateData__('`categories`', $dataId,'id="'.$data['data']->insertedId.'"');

		}else{
			return $this->invalidSession(); 
		}
		 
	}
	

	public function addLvl1Category(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			$data = $this->insertRawData__('`categories-level1`', $dataset); 

			$dataId = array(
				'id' => $data['data']->insertedId, 
				'cat_lvl1_id' => $this->generateID('CL1', $data['data']->insertedId)
			);

			return $this->updateData__('`categories-level1`', $dataId ,'id="'.$data['data']->insertedId.'"');


		}else{
			return $this->invalidSession(); 
		} 
		 
	} 


	public function addLvl2Category(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			$data = $this->insertRawData__('`categories-level2`', $dataset); 

			$dataId = array(
				'id' => $data['data']->insertedId, 
				'cat_lvl2_id' => $this->generateID('CL2', $data['data']->insertedId)
			);

			return $this->updateData__('`categories-level2`', $dataId ,'id="'.$data['data']->insertedId.'"');

		}else{
			return $this->invalidSession(); 
		} 
		 
	} 


	public function getMainCategoriesDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('cat_id', 'cat_name'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => '*' ,   
				'table' => 'categories',
				'data' => $search_by_feilds.' order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'categories',
				'data' => '1',
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


	public function getLvl1CategoriesDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('cl.cat_lvl1_id', 'cl.cat_lvl1_name', 'c.cat_name'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'cl.*, c.cat_name' ,   
				'table' => '`categories-level1` cl, categories c ',
				'data' => "c.cat_id=cl.parent_cat_id AND (".$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => '*' ,   
				'table' => '`categories-level1`',
				'data' => '1',
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


	public function getLvl2CategoriesDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('cl.cat_lvl2_id', 'cl.cat_lvl2_name', 'c.cat_lvl1_name'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'cl.*, c.cat_lvl1_name' ,   
				'table' => '`categories-level2` cl, `categories-level1` c ',
				'data' => "c.cat_lvl1_id=cl.parent_cat_id AND (".$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => '*' ,   
				'table' => '`categories-level2`',
				'data' => '1',
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



	public function editMainCategory(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('categories', $dataset,'cat_id="'.$this->input->post('cat_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	}


	public function editLvl1Category(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('`categories-level1`', $dataset,'cat_lvl1_id="'.$this->input->post('cat_lvl1_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	}

	public function editLvl2Category(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('`categories-level2`', $dataset,'cat_lvl2_id="'.$this->input->post('cat_lvl2_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	}

	public function deleteMainCategory(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('categories','cat_id="'.$this->input->post('cat_id').'"');
		}else{
			return $this->invalidSession(); 
		} 
		  
	}


	public function deleteLvl1Category(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('`categories-level1`','cat_lvl1_id="'.$this->input->post('cat_lvl1_id').'"');
		}else{
			return $this->invalidSession(); 
		} 
		  
	}

 
}
