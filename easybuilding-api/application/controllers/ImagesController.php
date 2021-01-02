<?php
include 'CommonController.php';
defined('BASEPATH') OR exit('No direct script access allowed');

class ImagesController extends CommonController {
	  
    function __construct(){ 
	    parent::__construct();
	    $this->load->model('CommonQueryModel');  
	
	} 

	public function getNextTableID(){   
		return $this->getNextID('customers');  
	}  
	

	public function getImageDetailsDT(){  

		if (sizeof($this->isUserSessionValid()['data']) == 1) {

			$dt = $this->dataTableInitialValues(); 
			$search_columns = array('p.project_id', 'p.project_name', 'pi.img_id', 'pi.file_name', "cc.display_name"); 

	     	$search_by_feilds = $this->searchFromColsDT($search_columns, $dt['search_val']); 
			$selectedOrd = 'desc'; //$dt['get_order'];
			$orderedCol = $dt['get_column_name'];		

			$search1 = array(
				'columns' => 'pi.*, p.project_name, cc.display_name, cc.company_id, cc.client_id' ,   
				'table' => 'project_images pi, project p , client_company cc ',
				'data' => 'p.project_id=pi.project_id AND p.company_id=cc.company_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.' LIMIT '.$dt['start'].','.$dt['length'].'  ',
				'eq_table_col' => ''
			); 

		  
			$get_data = array(
				'columns' => 'pi.*, p.project_name, cc.display_name' ,   
				'table' => 'project_images pi, project p , client_company cc ',
				'data' => 'p.project_id=pi.project_id AND p.company_id=cc.company_id AND ('.$search_by_feilds.') order by '. $orderedCol .' '.$selectedOrd.'',
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
			return $this->invalidSession(); 
		}
		
	}

 

 
}
