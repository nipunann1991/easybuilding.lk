<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class BOQController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	}
	 
	
 	public function getHouseAreasDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('house_area_id', 'house_area'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => '*' ,   
				'table' => 'house_area',
				'data' => $search_by_feilds.' order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'house_area',
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


	public function getHouseAreas(){  

		$search_index = array(
			'columns' => '*' ,   
			'table' => 'house_area',
			'eq_table_col' => '1',
			'data' => '1', 
		);

		return $this->selectCustomData__($search_index);
		
	}


	public function addHouseAreas(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			$data = $this->insertRawData__('house_area', $dataset); 

			$dataId = array(
				'id' => $data['data']->insertedId, 
				'house_area_id' => $this->generateID('H', $data['data']->insertedId)
			);

			return $this->updateData__('`house_area`', $dataId,'id="'.$data['data']->insertedId.'"');

		}else{
			return $this->invalidSession(); 
		}
		 
	}



	public function getSelectedHouseArea(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'house_area',
				'eq_table_col' => '1',
				'data' => 'house_area_id= "'.$this->input->post('house_area_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function editHouseArea(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('house_area', $dataset,'house_area_id="'.$this->input->post('house_area_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	}



	public function deleteHouseArea(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('house_area','house_area_id="'.$this->input->post('house_area_id').'"');
		}else{
			return $this->invalidSession(); 
		} 
		  
	}
	

	public function getHouseSurfaceDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('surface_type_id', 'surface_type'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => '*' ,   
				'table' => 'house_surfaces',
				'data' => $search_by_feilds.' order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'house_surfaces',
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


	public function addHouseSurface(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			$data = $this->insertRawData__('house_surfaces', $dataset); 

			$dataId = array(
				'id' => $data['data']->insertedId, 
				'surface_type_id' => $this->generateID('S', $data['data']->insertedId)
			);

			return $this->updateData__('`house_surfaces`', $dataId,'id="'.$data['data']->insertedId.'"');

		}else{
			return $this->invalidSession(); 
		}
		 
	}



	public function getSelectedHouseSurface(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'house_surfaces',
				'eq_table_col' => '1',
				'data' => 'surface_type_id= "'.$this->input->post('surface_type_id').'"', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function editHouseSurface(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('house_surfaces', $dataset,'surface_type_id="'.$this->input->post('surface_type_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	}



	public function deleteHouseSurface(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('house_surfaces','surface_type_id="'.$this->input->post('surface_type_id').'"');
		}else{
			return $this->invalidSession(); 
		} 
		  
	}



	public function getHouseSurfaceTypeDT(){   
  
		if (sizeof($this->isUserSessionValid()['data']) == 1) { 
 
			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('hst.house_surfaces_type_id', 'hs.surface_type', 'hst.house_surfaces_type'); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'hst.*, hs.surface_type' ,   
				'table' => 'house_surfaces_type hst, house_surfaces hs',
				'data' => "hst.surface_type_id=hs.surface_type_id AND (".$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => '*' ,   
				'table' => 'house_surfaces_type',
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
	

	public function getHouseSurfaces(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$search_index = array(
				'columns' => '*' ,   
				'table' => 'house_surfaces',
				'eq_table_col' => '1',
				'data' => '1', 
			);

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function addHouseSurfaceType(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post();
			$data = $this->insertRawData__('house_surfaces_type', $dataset); 

			$dataId = array(
				'id' => $data['data']->insertedId, 
				'house_surfaces_type_id' => $this->generateID('ST', $data['data']->insertedId)
			);

			return $this->updateData__('`house_surfaces_type`', $dataId,'id="'.$data['data']->insertedId.'"');

		}else{
			return $this->invalidSession(); 
		}
		 
	}


	public function deleteHouseSurfaceType(){   

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			return $this->deleteData__('house_surfaces_type','house_surfaces_type_id="'.$this->input->post('house_surfaces_type_id').'"');
		}else{
			return $this->invalidSession(); 
		} 
		  
	}



	public function getSelectedHouseSurfaceType(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			
			$search_index = array(
				'columns' => 'hst.*, hs.surface_type' , 
				'table' => 'house_surfaces_type hst, house_surfaces hs',
				'eq_table_col' => '1',
				'data' => 'hst.surface_type_id=hs.surface_type_id AND hst.house_surfaces_type_id= "'.$this->input->post('house_surfaces_type_id').'"', 
			); 

			return $this->selectCustomData__($search_index);

		}else{
			return $this->invalidSession(); 
		}
		
	}


	public function editHouseSurfaceType(){ 

		if (sizeof($this->isUserSessionValid()['data']) == 1) {
			$dataset = $this->input->post(); 
			return $this->updateData__('house_surfaces_type', $dataset,'house_surfaces_type_id="'.$this->input->post('house_surfaces_type_id').'"');
		}else{
			return $this->invalidSession(); 
		} 

	}


	public function getSelectedHouseSurfaceTypeList(){  

		$search_index = array(
			'columns' => 'hst.*, hs.*' , 
			'table' => 'house_surfaces_type hst, house_surfaces hs',
			'eq_table_col' => '1',
			'data' => 'hst.surface_type_id=hs.surface_type_id', 
		); 

		return $this->selectCustomData__($search_index);
		
	}
 
}
